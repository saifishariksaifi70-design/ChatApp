import dns from 'node:dns';

import express from 'express'
import dotenv from 'dotenv'
dotenv.config();
import dbConnect from './DB/dbConnect.js';
import authRouter from './root/authUser.js'
import messageRouter from './root/messageRoute.js'
import userRouter from './root/userRout.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'

const app = express();

dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.8.4.4']);

app.use(cors({
    origin: 'http://localhost:5174',
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth',authRouter)
app.use('/api/message',messageRouter)
app.use('/api/user',userRouter)


app.get('/', (req, res)=>{
    res.send('server is working')
})

const PORT = process.env.PORT || 4000
app.listen(PORT , ()=>{
    dbConnect();
    console.log(`http://localhost:${PORT}`)
})