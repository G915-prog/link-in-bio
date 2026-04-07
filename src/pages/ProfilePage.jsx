import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useProfile } from '../hooks/useProfile'
import { supabase } from '../lib/supabase'

const TEST_USER = {
  id: '00000000-0000-0000-0000-000000000001',
  username: 'testuser',
  display_name: 'Test User',
  bio: 'This is a test profile.',
  avatar_url: '',
  theme: 'default',
  updated_at: new Date().toISOString(),
}

async function seedTestUser() {
  const { error } = await supabase.from('profiles').upsert(TEST_USER)
  if (error) console.error('Seed error:', error.message)
  else console.log('Test user seeded:', TEST_USER)
}

function ProfilePage() {
  const { username } = useParams()
  const { profile, loading, error } = useProfile(username ?? 'testuser')

  useEffect(() => {
    seedTestUser()
  }, [])

  useEffect(() => {
    if (profile) console.log('profile:', profile)
  }, [profile])

  return <h1>Profile: {username}</h1>
}

export default ProfilePage
