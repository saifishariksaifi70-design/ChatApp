import React from 'react'

function Message() {
  return (
    <div className="h-full w-full bg-gray-50 flex items-center justify-center">

        <div className="text-center">
          <div className="text-5xl mb-3">
            💬
          </div>

          <h2 className="text-2xl font-semibold text-gray-700">
            Welcome ! 👋 Select a user 😎
          </h2>

          <p className="text-gray-500 text-xl">
            Select a user to start chatting
          </p>
        </div>

      </div>
  )
}

export default Message















// import React, { useState } from "react";
// import { useAuth } from "../context/AuthContext";

// function Message({
//     selectedUser,
//     moveUserTop
// }) {
//     const { authUser } = useAuth();
//     const [message, setMessage] = useState("");
//     const [messages, setMessages] = useState([])
//      const handleSendMessage = async (e) => {
//     e.preventDefault();

//     if (!message.trim()) return;
//     if (!selectedUser) return;

//     try {

//       const res = await axios.post(
//         `/api/message/send/${selectedUser._id}`,
//         {
//           message: message
//         }
//       );

//       // Message screen par show
//       setMessages((prev) => [
//         ...prev,
//         res.data
//       ]);

//       // Jisko message kiya usko Sidebar me top par lao
//       if (moveUserToTop) {
//         moveUserToTop(selectedUser);
//       }

//       // Input empty
//       setMessage("");

//     } catch (error) {

//       console.log(error);

//     }
//   };

//   // Agar koi user select nahi hua
//   if (!selectedUser) {
//     return (
      // <div className="h-full w-full bg-gray-50 flex items-center justify-center">

      //   <div className="text-center">
      //     <div className="text-5xl mb-3">
      //       💬
      //     </div>

      //     <h2 className="text-xl font-semibold text-gray-700">
      //       Select a user
      //     </h2>

      //     <p className="text-gray-500">
      //       Select a user from sidebar to start chatting
      //     </p>
      //   </div>

      // </div>
//     );
//   }

//   return (
//     <div className="h-full w-full bg-gray-50 flex flex-col">

//       {/* Chat Header */}
//       <div className="h-16 px-6 bg-white border-b flex items-center gap-3">
//         <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold">
//           {selectedUser.username?.chartAt(0).toUppercase()}
//         </div>

//         <div>
//           <h2 className="font-semibold">{selectedUser.username}</h2>
//           <p className={`text-sm ${
//             selectedUser.isOnline ? "text-green-500":"text-gray-400"
//           }`}>
//             {selectedUser.isOnline ? "Online" : "Offline"}
//           </p>
//         </div>
//       </div>

//       {/* Messages */}
//       <div className="flex-1 p-6 overflow-y-auto">
        
//         <div className="flex justify-start mb-4">
//           <div className="bg-white px-4 py-2 rounded-2xl shadow-sm max-w-xs">
//             <p>Hello 👋</p>
//           </div>
//         </div>

//         <div className="flex justify-end mb-4">
//           <div className="bg-purple-600 text-white px-4 py-2 rounded-2xl max-w-xs">
//             <p>Hi! How are you?</p>
//           </div>
//         </div>

//       </div>

//       {/* Message Input */}
//       <div className="p-4 bg-white border-t">
//         <div className="flex gap-3">
          
//           <input
//             type="text"
//             placeholder="Type a message..."
//             className="flex-1 h-12 px-4 rounded-xl bg-gray-100 outline-none focus:ring-2 focus:ring-purple-500"
//           />

//           <button className="px-6 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700">
//             Send
//           </button>

//         </div>
//       </div>

//     </div>
//   );
// }

// export default Message;