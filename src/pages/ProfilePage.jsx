import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useProfile } from '../hooks/useProfile'

function ProfilePage() {
  const { username } = useParams()
  const { profile, loading, error } = useProfile(username ?? 'testuser')

  useEffect(() => {
    if (profile) console.log('profile:', profile)
  }, [profile])

  return <h1>Profile: {username}</h1>
}

export default ProfilePage
