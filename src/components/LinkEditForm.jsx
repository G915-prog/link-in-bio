import { useState, useEffect } from 'react'

function LinkEditForm({ link, onSave, onCancel }) {
  const [title, setTitle] = useState(link.title)
  const [url, setUrl] = useState(link.url)

  useEffect(() => {
    setTitle(link.title)
    setUrl(link.url)
  }, [link.id])

  function handleSave() {
    onSave(link.id, { title, url })
  }

  return (
    <div className="link-edit-form">
      <input
        type="text"
        className="link-edit-form__input"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Title"
      />
      <input
        type="url"
        className="link-edit-form__input"
        value={url}
        onChange={e => setUrl(e.target.value)}
        placeholder="https://..."
      />
      <div className="link-edit-form__actions">
        <button type="button" className="link-edit-form__save-btn" onClick={handleSave}>
          Save
        </button>
        <button type="button" className="link-edit-form__cancel-btn" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  )
}

export default LinkEditForm
