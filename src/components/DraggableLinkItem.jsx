import { useState } from 'react'
import LinkRow from './LinkRow'
import LinkEditForm from './LinkEditForm'

function DraggableLinkItem({ link, index, onDragStart, onDragOver, onDrop, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false)

  function handleSave(id, changes) {
    onUpdate(id, changes)
    setEditing(false)
  }

  return (
    <div
      className="draggable-link-item"
      draggable
      onDragStart={() => onDragStart(index)}
      onDragOver={onDragOver}
      onDrop={() => onDrop(index)}
    >
      <span className="draggable-link-item__handle" aria-hidden="true">⠿</span>
      {editing
        ? <LinkEditForm link={link} onSave={handleSave} onCancel={() => setEditing(false)} />
        : <LinkRow link={link} onEdit={() => setEditing(true)} onDelete={onDelete} />
      }
    </div>
  )
}

export default DraggableLinkItem
