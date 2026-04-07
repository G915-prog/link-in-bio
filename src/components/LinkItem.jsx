import { supabase } from '../lib/supabase'

function LinkItem({ link }) {
  async function handleClick() {
    await supabase.rpc('increment_click_count', { link_id: link.id })
  }

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="link-item"
      onClick={handleClick}
      onAuxClick={handleClick}
    >
      <span className="link-item__title">{link.title}</span>
      <span className="link-item__url">{link.url}</span>
    </a>
  )
}

export default LinkItem
