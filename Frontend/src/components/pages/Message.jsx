import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { IoArrowBack, IoSend } from "react-icons/io5";
import userConversation from "../../zustand/useConversation";
import axios from "axios";
import { useSocketContext } from "../context/SocketContext";

function Message({ selectedUser, setSelectedUser, moveUserTop }) {
    const {messages, setMessages, selectedConversation, setSelectedConversation, increaseUnread} = userConversation();
    const {socket,onlineUser} = useSocketContext()
    const { authUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [sending, setSending] = useState(false)
    const [sendData, setSendData] = useState("")
    const lastmessageRef = useRef();
    
    

    useEffect(() => {
    if (!socket) return;

    const handleNewMessages = (newMessage) => {
        const senderId = String(newMessage.senderId);
        const currentUserId = String(selectedConversation?._id);

        if (senderId === currentUserId) {
            setMessages((prev) => [...prev, newMessage]);
        } else {
            increaseUnread(senderId);
        }
    };

    socket.on("newMessage", handleNewMessages);

    return () => {
        socket.off("newMessage", handleNewMessages);
    };
}, [
    socket,
    selectedConversation?._id,
    setMessages,
    increaseUnread
]);

    useEffect(()=>{
        setTimeout(()=>{
            lastmessageRef.current?.scrollIntoView({behavior:"smooth"})
        },100)
    },[messages])

    useEffect(()=>{
        const getMessages = async()=>{
            setLoading(true)

            try {
                const res = await axios.get(`/api/message/${selectedConversation?._id}`)
                const data = res.data;
                if(data.success === false){
                    setLoading(false)
                    console.log(data.messages)
                }
                setLoading(false)
                setMessages(data)
                
            } catch (error) {
                setLoading(false)
                console.log(error)
                
            }
        }
        if(selectedConversation?._id) getMessages();

    },[selectedConversation?._id, setMessages])
    // console.log(messages)
    const handleMessage = (e)=>{
            setSendData(e.target.value)

    }
    const handleSubmit = async (e)=>{
        e.preventDefault()
        if(!sendData.trim()) return;
        setSending(true)
        try {
            const res = await axios.post(`/api/message/send/${selectedConversation?._id}`,{message:sendData});
            const data = res.data
            if(data.success === false){
                setSending(false)
                console.log(data.message)
            }
            setSending(false)
            setSendData('')
            setMessages([...messages,data])
            moveUserTop(selectedConversation)
            
        } catch (error) {
            setSending(false)
            console.log(error)
        }


    }
    const handleDelete = async(id)=>{
        try {
            const res = await axios.delete(`/api/message/${id}`);
            const data = res.data

            if(data.success === false){
                console.log(data.message);
                return
            }
            setMessages(messages.filter((message)=>message._id !== id))
            
        } catch (error) {
            console.log(error);
            
        }

    }

    return (
        <div className="h-full w-full bg-gray-50 flex items-center justify-center">

            {!selectedUser ? (
                <div className="text-center">
                    <div className="text-5xl mb-3">💬</div>

                    <h2 className="text-2xl font-semibold text-gray-700">
                        Welcome ! 👋 {authUser?.username} 😎
                    </h2>

                    <p className="text-gray-500 text-xl">
                        Select a user to start chatting
                    </p>
                </div>
            ) : (
                <div className="h-full w-full flex flex-col">

                    {/* Chat Header */}
                    <div className="h-16 px-4 md:px-6 bg-white border-b flex items-center gap-3">

                        {/* Back Button - Mobile */}
                        <button onClick={() => {setSelectedUser(null);setSelectedConversation(null)}} className="md:hidden text-2xl">
                            <IoArrowBack />
                        </button>

                        <img src={selectedConversation.profilepic} alt={selectedConversation.username} className="w-10 h-10 rounded-full" />

                        <div>
                            <h2 className="font-semibold">{selectedConversation.username}</h2>

                            <p className={`text-sm ${onlineUser.includes(String(selectedConversation?._id)) 
                                ? "text-green-500" : "text-gray-400"}`}>
                                {onlineUser.includes(String(selectedConversation?._id)) ? "Online" : "Offline"}
                            </p>
                        </div>

                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-auto p-4">
    {loading && (
        <div className="flex h-full items-center justify-center">
            <div className="loading loading-spinner"></div>
        </div>
    )}

    {!loading && messages?.length === 0 && (
        <p className="text-center text-gray-400 mt-5">Start a conversation</p>
    )}

    {!loading && messages?.length > 0 && messages.map((message) => (
        <div key={message?._id} ref={lastmessageRef} className="mb-2">
            <div className={`flex ${String(message.senderId) === String(authUser._id) 
                ? "justify-end" 
                : "justify-start"}`}>
                <div className="max-w-[70%]">
                    <div className={`px-3 py-2 rounded-xl break-words ${String(message.senderId) === String(authUser._id) ? 
                        "bg-purple-500 text-white" : "bg-gray-200 text-gray-800"}`}>
                        {message?.message}
                    </div>
                    {String(message.senderId) === String(authUser._id) && (
                        <button onClick={()=>handleDelete(message._id)}
                        className="text-xs text-red-600 mt-1 cursor-pointer">
                            Delete

                        </button>
                    )}

                    <div className={`text-[10px] text-gray-400 mt-1 ${String(message.senderId) === String(authUser._id) ? "text-right" : "text-left"}`}>
                        {new Date(message?.createdAt).toLocaleTimeString("en-IN", {
                            hour: "numeric",
                            minute: "2-digit"
                        })}
                    </div>
                </div>
            </div>
        </div>
    ))}
</div>


                    {/* Input */}
                    <div className="p-3 md:p-4 bg-white border-t">
                        <form onSubmit={handleSubmit}>
                            <div className="flex gap-2 md:gap-3">
                            <input type="text" onChange={handleMessage} placeholder="Type a message..."
                            value={sendData} required id='message' 
                            className="flex-1 h-12 px-4 rounded-xl bg-gray-100 outline-none" />

                            <button type="submit" 
                            className="px-4 md:px-6 rounded-xl bg-purple-600 text-white">
                                {sending ? <div></div> : <IoSend size={40} 
                                className="text-white cursor-pointer bg-purple-600 h-auto p-1"/>}
                            </button>
                        </div>
                        </form>
                    </div>

                </div>
            )}
        </div>
    );
}

export default Message;