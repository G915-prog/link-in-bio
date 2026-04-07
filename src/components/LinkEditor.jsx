import { useState } from 'react'
import { useLinks } from '../hooks/useLinks'

function LinkEditor({ userId }) {
  const { links, loading, error, addLink, deleteLink, updateLink, reorderLinks } = useLinks(userId)

  const [title, setTitle]     = useState('')
  const [url, setUrl]         = useState('')
  const [adding, setAdding]   = useState(false)
  const [addError, setAddError] = useState(null)

  const [editingId, setEditingId] = useState(null)
  const [editTitle, setEditTitle] = useState('')
  const [editUrl, setEditUrl]     = useState('')

  async function handleAdd(e) {
    e.preventDefault()
    setAdding(true)
    setAddError(null)
    const { error: err } = await addLink({ title, url })
    setAdding(false)
    if (err) {
      setAddError(err)
    } else {
      setTitle('')
      setUrl('')
    }
  }

  function startEdit(link) {
    setEditingId(link.id)
    setEditTitle(link.title)
    setEditUrl(link.url)
  }

  async function handleUpdate(e) {
    e.preventDefault()
    await updateLink(editingId, { title: editTitle, url: editUrl })
    setEditingId(null)
  }

  if (loading) return <p className="status-message">Loading links...</p>

  return (
    <div className="link-editor">
      <form className="link-editor__add-form" onSubmit={handleAdd}>
        <input
          type="text"
          className="link-editor__input"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <input
          type="url"
          className="link-editor__input"
          placeholder="https://..."
          value={url}
          onChange={e => setUrl(e.target.value)}
          required
        />
        {addError && <p className="link-editor__error">{addError}</p>}
        <button type="submit" className="link-editor__add-btn" disabled={adding}>
          {adding ? 'Adding...' : 'Add link'}
        </button>
      </form>

      {error && <p className="link-editor__error">{error}</p>}

      <ul className="link-editor__list">
        {links.map((link, i) => (
          <li key={link.id} className="link-editor__item">
            {editingId === link.id ? (
              <form className="link-editor__edit-form" onSubmit={handleUpdate}>
                <input
                  type="text"
                  className="link-editor__input"
                  value={editTitle}
                  onChange={e => setEditTitle(e.target.value)}
                  required
                />
                <input
                  type="url"
                  className="link-editor__input"
                  value={editUrl}
                  onChange={e => setEditUrl(e.target.value)}
                  required
                />
                <div className="link-editor__edit-actions">
                  <button type="submit" className="link-editor__save-btn">Save</button>
                  <button type="button" className="link-editor__cancel-btn" onClick={() => setEditingId(null)}>Cancel</button>
                </div>
              </form>
            ) : (
              <>
                <div className="link-editor__item-info">
                  <span className="link-editor__item-title">{link.title}</span>
                  <span className="link-editor__item-url">{link.url}</span>
                </div>
                <div className="link-editor__item-actions">
                  <button type="button" className="link-editor__order-btn" onClick={() => reorderLinks(i, i - 1)} disabled={i === 0} aria-label="Move up">↑</button>
                  <button type="button" className="link-editor__order-btn" onClick={() => reorderLinks(i, i + 1)} disabled={i === links.length - 1} aria-label="Move down">↓</button>
                  <button type="button" className="link-editor__edit-btn" onClick={() => startEdit(link)}>Edit</button>
                  <button type="button" className="link-editor__delete-btn" onClick={() => deleteLink(link.id)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default LinkEditor
