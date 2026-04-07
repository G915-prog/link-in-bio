function ProfileHeader({ displayName, bio }) {
  return (
    <div className="profile-header">
      <h1 className="profile-header__name">{displayName}</h1>
      <p className="profile-header__bio">{bio}</p>
    </div>
  )
}

export default ProfileHeader
