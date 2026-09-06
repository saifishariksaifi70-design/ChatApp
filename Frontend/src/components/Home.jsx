import React, { useState } from 'react'
import { useAuth } from './context/AuthContext'
import Sidebar from './pages/Sidebar';
import Message from './pages/Message';


function Home() {
  const [selectedUser, setSelectedUser] = useState(null)
  const [searchUser, setSearchUser] = useState([])
  const { authUser } = useAuth();

  const moveUserTop = (user)=>{
    setSearchUser((prev)=>{
      const filteredUser = prev.find(
        (item)=> item._id === user._id
        );
        return [user,...filteredUser]

    })

  }
  return (
    <div className='h-screen w-full flex justify-center items-center bg-white'>
     <div className='w-full max-w-7xl h-[90vh] flex'>
       <div className='w-[35%] border-r border-gray-300'>
        <Sidebar 
        searchUser={searchUser}
        setSearchUser={setSearchUser}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        />
      </div>
      <div className='w-[65%]'>
        <Message 
        selectedUser={selectedUser}
        moveUserTop={moveUserTop}
        />
      </div>
     </div>
    </div>
  )
}

export default Home