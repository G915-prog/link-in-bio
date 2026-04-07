import { useParams } from 'react-router-dom'

function ProfilePage() {
  const { username } = useParams()
  return <h1>Profile: {username}</h1>
}

export default ProfilePage
