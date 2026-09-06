import Message from "../Models/messageSchema.js";
import Conversation from '../Models/conversationModels.js'

export const sendMessage = async (req,res)=>{
    try {
        const {message} = req.body;
        const {id:reciverId} = req.params;
        const senderId = req.user._id;

        let chats = await Conversation.findOne({
            participants:{$all:[senderId ,reciverId ]}
        })

        if(!chats){
            chats = await Conversation.create ({
                participants:[senderId , reciverId]
            })
        }
        const newMessages = new Message({
            senderId,
            reciverId,
            message,
            conversationId: chats._id
        })

        if(newMessages){
            chats.messages.push(newMessages._id)
        }

        //SOCKET.IO function
        await Promise.all([chats.save(),newMessages.save()])
        res.status(201).send(newMessages)

    } catch (error) {
        res.status(400).send({
            success: false,
            message:error
        })
        console.log(error)
        
    }

}
export const getMessage = async(req,res)=>{
    try {
        const {id:reciverId} = req.params;
        const senderId = req.user._id;
        const chats = await Conversation.findOne({
            participants:{$all:[senderId,reciverId]}
        }).populate("messages")

        if(!chats) return res.status(200).send([]);
        const message = chats.messages;
        res.status(200).send(message);
        
        
    } catch (error) {
        res.status(400).send({
            success: false,
            message:error
        })
        console.log(error)
    }
}