import { useState } from 'react'

function DraggableLinkItem({ link, index, onDragStart, onDragOver, onDrop, onUpdate, onDelete }) {
  const [editing, setEditing]   = useState(false)
  const [title, setTitle]       = useState(link.title)
  const [url, setUrl]           = useState(link.url)

  function handleSave() {
    onUpdate(link.id, { title, url })
    setEditing(false)
  }

  function handleEdit() {
    setTitle(link.title)
    setUrl(link.url)
    setEditing(true)
  }

  return (
    <div
      className="draggable-link-item"
      draggable={true}
      onDragStart={() => onDragStart(index)}
      onDragOver={onDragOver}
      onDrop={() => onDrop(index)}
    >
      <span className="draggable-link-item__handle" aria-hidden="true">⠿</span>

      {editing ? (
        <div className="draggable-link-item__edit">
          <input
            type="text"
            className="draggable-link-item__input"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Title"
          />
          <input
            type="url"
            className="draggable-link-item__input"
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder="https://..."
          />
        </div>
      ) : (
        <div className="draggable-link-item__info">
          <span className="draggable-link-item__title">{link.title}</span>
          <span className="draggable-link-item__url">{link.url}</span>
        </div>
      )}

      <div className="draggable-link-item__actions">
        {editing ? (
          <>
            <button type="button" className="draggable-link-item__save" onClick={handleSave}>Save</button>
            <button type="button" className="draggable-link-item__cancel" onClick={() => setEditing(false)}>Cancel</button>
          </>
        ) : (
          <button type="button" className="draggable-link-item__edit-btn" onClick={handleEdit}>Edit</button>
        )}
        <button type="button" className="draggable-link-item__delete" onClick={() => onDelete(link.id)}>Delete</button>
      </div>
    </div>
  )
}

export default DraggableLinkItem
