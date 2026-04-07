import { supabase } from '../lib/supabase'

function LinkItem({ link }) {
  function handleClick() {
    console.log('[LinkItem] click on', link.id, link.title)
    supabase.rpc('increment_click_count', { link_id: link.id })
      .then(({ error }) => console.log('[LinkItem] rpc result — error:', error))
  }

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="link-item"
      onClick={handleClick}
    >
      <span className="link-item__title">{link.title}</span>
      <span className="link-item__url">{link.url}</span>
    </a>
  )
}

export default LinkItem
