import React from 'react'
import useAuth from '../hooks/useAuth'

const Home = () => {
  const { user } = useAuth()

  return (
    <div >Home, {user?.username}</div>
  )
}

export default Home
