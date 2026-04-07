import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useProfile } from '../hooks/useProfile'
import { supabase } from '../lib/supabase'
import ProfileHeader from '../components/ProfileHeader'
import LinkList from '../components/LinkList'
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
      <ProfileHeader profile={profile} />

      {!linksLoading && <LinkList links={links} />}

      <QRCode url={`${window.location.origin}/profile/${profile.username}`} />
    </main>
  )
}

export default ProfilePage
