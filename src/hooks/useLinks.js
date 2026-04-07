import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useLinks(userId, { publishedOnly = false } = {}) {
  const [links, setLinks] = useState([])
  const [loading, setLoading] = useState(!!userId)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!userId) return

    async function fetchLinks() {
      setLoading(true)
      setError(null)
      let query = supabase
        .from('links')
        .select('*')
        .eq('user_id', userId)
        .order('display_order')

      if (publishedOnly) query = query.eq('is_published', true)

      const { data, error: fetchError } = await query

      if (fetchError) {
        setError(fetchError.message)
      } else {
        setLinks(data)
      }
      setLoading(false)
    }

    fetchLinks()

    const channel = supabase
      .channel(`links:${userId}`)
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'links', filter: `user_id=eq.${userId}` },
        (payload) => {
          setLinks(prev => prev.map(l => l.id === payload.new.id ? { ...l, ...payload.new } : l))
        }
      )
      .subscribe()

    return () => supabase.removeChannel(channel)
  }, [userId])

  async function addLink({ title, url }) {
    const nextOrder = links.length > 0
      ? Math.max(...links.map(l => l.display_order ?? 0)) + 1
      : 0

    const tempId = `temp-${Date.now()}`
    const tempLink = { id: tempId, title, url, user_id: userId, display_order: nextOrder }
    setLinks(prev => [...prev, tempLink])

    const { data, error: insertError } = await supabase
      .from('links')
      .insert({ title, url, user_id: userId, display_order: nextOrder, is_published: true })
      .select()
      .single()

    if (insertError) {
      setLinks(prev => prev.filter(l => l.id !== tempId))
      return { error: insertError.message }
    }

    setLinks(prev => prev.map(l => l.id === tempId ? data : l))
    return { error: null }
  }

  async function deleteLink(id) {
    const saved = links.find(l => l.id === id)
    const savedIndex = links.findIndex(l => l.id === id)

    setLinks(prev => prev.filter(l => l.id !== id))

    const { error: deleteError } = await supabase
      .from('links')
      .delete()
      .eq('id', id)

    if (deleteError) {
      setLinks(prev => {
        const next = [...prev]
        next.splice(savedIndex, 0, saved)
        return next
      })
      return { error: deleteError.message }
    }

    return { error: null }
  }

  async function updateLink(id, changes) {
    const previous = links.find(l => l.id === id)

    setLinks(prev => prev.map(l => l.id === id ? { ...l, ...changes } : l))

    const { error: updateError } = await supabase
      .from('links')
      .update(changes)
      .eq('id', id)

    if (updateError) {
      setLinks(prev => prev.map(l => l.id === id ? previous : l))
      return { error: updateError.message }
    }

    return { error: null }
  }

  async function reorderLinks(fromIndex, toIndex) {
    const previousLinks = links
    const reordered = [...links]
    const [moved] = reordered.splice(fromIndex, 1)
    reordered.splice(toIndex, 0, moved)

    const withOrder = reordered.map((link, i) => ({ ...link, display_order: i }))
    setLinks(withOrder)

    const changed = withOrder.filter(link => {
      const original = previousLinks.find(l => l.id === link.id)
      return original?.display_order !== link.display_order
    })

    const results = await Promise.all(
      changed.map(link =>
        supabase.from('links').update({ display_order: link.display_order }).eq('id', link.id)
      )
    )

    const firstError = results.find(r => r.error)
    if (firstError) {
      setLinks(previousLinks)
      return { error: firstError.error.message }
    }

    return { error: null }
  }

  return { links, loading, error, addLink, deleteLink, updateLink, reorderLinks }
}
