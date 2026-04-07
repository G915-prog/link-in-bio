import { useState } from 'react'
import { useLinks } from '../hooks/useLinks'
import DraggableLinkItem from './DraggableLinkItem'

function LinkEditor({ userId }) {
  const { links, loading, error, addLink, deleteLink, updateLink, reorderLinks } = useLinks(userId)

  const [title, setTitle]       = useState('')
  const [url, setUrl]           = useState('')
  const [adding, setAdding]     = useState(false)
  const [addError, setAddError] = useState(null)
  const [dragIndex, setDragIndex] = useState(null)

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

      <div className="link-editor__list">
        {links.map((link, i) => (
          <DraggableLinkItem
            key={link.id}
            link={link}
            index={i}
            onDragStart={i => setDragIndex(i)}
            onDragOver={e => e.preventDefault()}
            onDrop={i => { reorderLinks(dragIndex, i); setDragIndex(null) }}
            onUpdate={updateLink}
            onDelete={deleteLink}
          />
        ))}
      </div>
    </div>
  )
}

export default LinkEditor
