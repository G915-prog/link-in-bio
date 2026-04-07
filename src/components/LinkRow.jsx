function LinkRow({ link, onEdit, onDelete }) {
  return (
    <div className="link-row">
      <div className="link-row__info">
        <span className="link-row__title">{link.title}</span>
        <span className="link-row__url">{link.url}</span>
      </div>
      <div className="link-row__actions">
        <button type="button" className="link-row__edit-btn" onClick={onEdit}>
          Edit
        </button>
        <button type="button" className="link-row__delete-btn" onClick={() => onDelete(link.id)}>
          Delete
        </button>
      </div>
    </div>
  )
}

export default LinkRow
