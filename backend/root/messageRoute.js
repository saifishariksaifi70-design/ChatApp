import express from 'express'
import { getMessage, sendMessage,deleteMessage } from '../routeControler/messageroutControl.js'
import isLogin from '../middleware/isLogin.js'

const router = express.Router()

router.post('/send/:id',isLogin,sendMessage)

router.get('/:id',isLogin,getMessage)

router.delete('/:id',isLogin,deleteMessage)

export default router