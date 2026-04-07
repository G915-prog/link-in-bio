import LinkItem from './LinkItem'

function LinkList({ links, emptyMessage = null }) {
  if (!links.length) {
    return emptyMessage ? <p className="link-list__empty">{emptyMessage}</p> : null
  }

  return (
    <ol className="link-list">
      {links.map(link => (
        <li key={link.id} className="link-list__item">
          <LinkItem link={link} />
        </li>
      ))}
    </ol>
  )
}

export default LinkList
