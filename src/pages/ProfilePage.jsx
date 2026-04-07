import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useProfile } from '../hooks/useProfile'
import { supabase } from '../lib/supabase'
import ProfileHeader from '../components/ProfileHeader'
import QRCode from '../components/QRCode'

function ProfilePage() {
  const { username } = useParams()
  const { profile, loading } = useProfile(username)

  const [links, setLinks] = useState([])
  const [linksLoading, setLinksLoading] = useState(false)

  useEffect(() => {
    if (!profile) return

    async function fetchLinks() {
      setLinksLoading(true)

      const { data } = await supabase
        .from('links')
        .select('*')
        .eq('user_id', profile.id)
        .eq('is_published', true)
        .order('display_order')

      setLinks(data ?? [])
      setLinksLoading(false)
    }

    fetchLinks()
  }, [profile])

  if (loading) return <p className="status-message">Loading profile...</p>
  if (!profile) return <p className="status-message">Profile not found.</p>

  return (
    <main className="profile-page">
      <ProfileHeader
        displayName={profile.display_name}
        bio={profile.bio}
      />

      {!linksLoading && (
        <ul className="links-list">
          {links.map((link) => (
            <li key={link.id} className="links-list__item">
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="links-list__anchor"
              >
                {link.title}
              </a>
            </li>
          ))}
        </ul>
      )}

      <QRCode url={`${window.location.origin}/profile/${username}`} />
    </main>
  )
}

export default ProfilePage
