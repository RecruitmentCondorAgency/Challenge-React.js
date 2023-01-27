import React from 'react'
import { AuthContext } from '../context/AuthContext'

export default function Profile() {
  const { user } = React.useContext(AuthContext)

  return (
    <div>
      <h1>Profile</h1>
      {JSON.stringify(user, null, 2)}
    </div>
  )
}
