import { create } from 'zustand'

const userConversation = create((set) => ({
    selectedConversation: null,

    setSelectedConversation: (selectedConversation) =>
        set({ selectedConversation }),

    messages: [],

    setMessages: (messages) =>
        set((state) => ({
            messages:
                typeof messages === "function"
                    ? messages(state.messages)
                    : messages
        })),

        unreadMessages:{},

        increaseUnread:(userId)=>
            set((state)=>({
                unreadMessages:{
                    ...state.unreadMessages,
                    [userId]:(state.unreadMessages[userId] || 0) +1
                }
            })),

        clearUnread :(userId)=>
            set((state)=>{
                const updated = { ...state.unreadMessages }
                delete updated[userId]

                return {
                    unreadMessages: updated
                }
            })
}))

export default userConversation