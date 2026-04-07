import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useProfile } from '../hooks/useProfile'
import { useLinks } from '../hooks/useLinks'
import ProfileHeader from '../components/ProfileHeader'
import LinkList from '../components/LinkList'
import QRCode from '../components/QRCode'

function ProfilePage() {
  const { username } = useParams()
  const { profile, loading } = useProfile(username)
  const { links, loading: linksLoading } = useLinks(profile?.id ?? null, { publishedOnly: true })

  const [copyLabel, setCopyLabel] = useState('Share')

  function handleShare() {
    const url = `${window.location.origin}/profile/${username}`
    if (navigator.share) {
      navigator.share({ title: profile?.display_name || username, url })
    } else {
      navigator.clipboard.writeText(url).then(() => {
        setCopyLabel('Copied!')
        setTimeout(() => setCopyLabel('Share'), 2000)
      })
    }
  }

  if (loading) return <p className="status-message">Loading profile...</p>
  if (!profile) return <p className="status-message">Profile not found.</p>

  return (
    <main className="profile-page">
      <ProfileHeader profile={profile} />

      <button type="button" className="profile-page__share" onClick={handleShare}>
        {copyLabel}
      </button>

      {!linksLoading && (
        <LinkList links={links} emptyMessage="No links yet." />
      )}

      <QRCode url={`${window.location.origin}/profile/${profile.username}`} />
    </main>
  )
}

export default ProfilePage
