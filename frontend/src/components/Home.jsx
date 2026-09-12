import React, { useState } from 'react'
import { useAuth } from './context/AuthContext'
import Sidebar from './pages/Sidebar'
import Message from './pages/Message'

function Home() {
  const [selectedUser, setSelectedUser] = useState(null)
  const [searchUser, setSearchUser] = useState([])
  const [chatUser, setChatUser] = useState([])
  const { authUser } = useAuth()

  const moveUserTop = (user) => {
    setSearchUser((prev) => {
      const filteredUser = prev.filter(
        (item) => item._id !== user._id
      )

      return [user, ...filteredUser]
    })
  }

  return (
    <div className="h-screen w-full bg-white">

      <div className="w-full h-full max-w-7xl mx-auto flex overflow-hidden">

        {/* Sidebar */}
        <div
          className={`
            h-full w-full md:w-[35%] md:block
            ${selectedUser ? 'hidden' : 'block'}
          `}
        >
          <Sidebar
            searchUser={searchUser}
            setSearchUser={setSearchUser}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
            chatUser={chatUser}
            setChatUser={setChatUser}
          />
        </div>

        {/* Message */}
        <div
          className={`
            h-full w-full md:w-[65%] md:block
            ${selectedUser ? 'block' : 'hidden'}
          `}
        >
          <Message
            selectedUser={selectedUser}
            moveUserTop={moveUserTop}
            setSelectedUser={setSelectedUser}
          />
        </div>

      </div>

    </div>
  )
}

export default Home