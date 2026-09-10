import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaSearchengin } from "react-icons/fa6";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import userConversation from "../../zustand/useConversation";
import { IoLogInOutline, IoSettingsOutline } from "react-icons/io5";
import { useSocketContext } from "../context/SocketContext";

function Sidebar({ searchUser, setSearchUser, selectedUser, setSelectedUser, chatUser, setChatUser }) {
    const navigate = useNavigate();
    const { authUser } = useAuth();
    const [searchInput, setSearchInput] = useState("");
    const [loading, setLoading] = useState(false);
    // const [chatUser, setChatUser] = useState([]);
    // const [selectedUserId, setSelectedUserId] = useState(null);
    const [showLogout, setShowLogout] = useState(false)
    const {messages, selectedConversation, setSelectedConversation, clearUnread,unreadMessages} = userConversation();
    const {onlineUser, socket} = useSocketContext()


    const nowOnline = chatUser.map((user)=> (user._id))
    const isOnline = nowOnline.map(userId => onlineUser.includes(String(userId)))


    useEffect(() => {
        const chatUserHandler = async () => {
            setLoading(true);
            try {
                const chatters = await axios.get("/api/user/currentchatters");
                const data = chatters.data;

                if (data.success === false) {
                    console.log(data.message);
                    return;
                }

                setChatUser(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        chatUserHandler();
    }, []);

    const handleSearch = async (value) => {
        setSearchInput(value);

        if (!value.trim()) {
            setSearchUser([]);
            return;
        }

        try {
            const response = await axios.get(`/api/user/search?search=${value}`);
            const data = response.data;

            if (data.success === false) {
                setSearchUser([]);
                return;
            }

            setSearchUser(data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSearchSubmit = async (e) => {
        e.preventDefault();

        if (!searchInput.trim()) {
            setSearchUser([]);
            return;
        }

        setLoading(true);

        try {
            const response = await axios.get(`/api/user/search?search=${searchInput}`);
            const data = response.data;

            if (data.success === false) {
                toast.error(data.message);
                return;
            }

            if (data.length === 0) {
                toast.info("User Not Found");
                setSearchUser([]);
            } else {
                setSearchUser(data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleUserClick = (user) => {
        
        setSelectedUser(user);
        setSelectedConversation(user)
         clearUnread(String(user._id));
    };

    const usersToShow = (searchUser?.length > 0 ? searchUser : chatUser).filter(
        (user)=> String(user._id) !== String(authUser?._id)
    )
    const handleLogoutUser = async()=>{
        try {
            const res = await axios.post(
                '/api/auth/logout',{},
                {
                    withCredentials: true,
                }
            )
            toast.success(res.data.message)
            localStorage.removeItem('chatapp')
            setShowLogout(false);
            navigate('/login')
            
        } catch (error) {
            console.log(error)
            toast.error("Logout Failed")
            
        }
    }

    return (
        <div className="h-full w-full bg-white flex flex-col">
            <div className="h-16 px-5 flex items-center justify-between border-b">
                <h1 className="text-xl font-bold text-purple-600">ChatApp</h1>
                <button onClick={() => setShowLogout(true)} 
                className="text-gray-500 hover:text-purple-600 cursor-pointer">
                     <IoLogInOutline size={30}/>
                </button>
                {showLogout && (
                    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white w-[350px] rounded-2xl p-6 shadow-2xl">

            {/* Heading */}
            <h2 className="text-xl font-semibold text-gray-800">
              Logout
            </h2>

            {/* Message */}
            <p className="text-gray-500 mt-2">
              Are you sure you want to logout?
            </p>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-6">

              {/* Cancel */}
              <button
                onClick={() => setShowLogout(false)}
                className="px-5 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
              >
                Cancel
              </button>

              {/* Logout */}
              <button
                onClick={handleLogoutUser}
                className="px-5 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
              >
                Logout
              </button>

            </div>

          </div>
        </div>
                )}
            </div>

            <div className="p-4 border-b relative flex justify-between">
                <form onSubmit={handleSearchSubmit} className="w-full flex items-center">
                    <input
                        type="text"
                        value={searchInput}
                        onChange={(e) => handleSearch(e.target.value)}
                        placeholder="Search users..."
                        className="w-full h-11 px-4 pr-12 rounded-xl bg-gray-100 outline-none focus:ring-2 focus:ring-purple-500"
                    />

                    <button type="submit" className="absolute right-16 top-4.5 cursor-pointer btn btn-circle bg-purple-500 rounded-full">
                        <FaSearchengin size={43} className="p-2" />
                    </button>
                </form>

                <img
                    onClick={() => navigate(`/profile/${authUser?._id}`)}
                    src={authUser?.profilepic}
                    alt="profile"
                    className="self-center h-12 w-12 rounded-full object-cover hover:scale-110 cursor-pointer"
                />
            </div>

            <div className="flex-1 overflow-y-auto">
                {usersToShow.length === 0 ? (
                    <div className="flex flex-col items-center font-bold text-purple-500 mt-10">
                        <h1>Why Are You Alone!! 😒</h1>
                        <h1>Search User To Chat</h1>
                    </div>
                ) : (
                    usersToShow.map((user) => (
                        <div
                            key={user._id}
                            onClick={() => handleUserClick(user)}
                            className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition duration-200 hover:bg-gray-100 
                                ${selectedUser?._id === user._id ? "bg-purple-300" : ""}`}
                        >
                            <div className={`avatar ${onlineUser.includes(String(user._id))? "online" : ""}`}> 
                                <img
                                src={user.profilepic}
                                alt={user.username}
                                className="w-11 h-11 rounded-full object-cover"
                            />
                            </div>

                           <div className="flex-1">
                             <div className="flex items-center justify-between gap-2">
                                <h3 className="font-semibold">{user.username}</h3>
                                {unreadMessages[String(user._id)] > 0 && (
                                    <span className="bg-green-600 text-white text-md font-bold min-w-10 min-h-7 
                                    h-5 px-1 rounded-full flex items-center justify-center">
                                        +{unreadMessages[String(user._id)]}
                                    </span>
                                )}
                                 </div>

                                <p className={`text-sm ${onlineUser.includes(String(user._id)) ? "text-green-500" : "text-gray-600"}`}>
                                    {onlineUser.includes(String(user._id)) ? "Online" : "Offline"}
                                </p>
                            </div>
                          
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Sidebar;