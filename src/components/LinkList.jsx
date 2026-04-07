import LinkItem from './LinkItem'

function LinkList({ links }) {
  if (!links.length) return null

  return (
    <ol className="link-list">
      {links.map((link) => (
        <li key={link.id} className="link-list__item">
          <LinkItem link={link} />
        </li>
      ))}
    </ol>
  )
}

export default LinkList
