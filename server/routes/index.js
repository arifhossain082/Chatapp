const router = require('express').Router();
const authenticate = require('../middleware/authentication');
const userRouter = require('./userRouter');
const messageRouter = require('./messageRouter');
const chatRouter = require('./chatRouter');
const authRouter = require('./auth')
const todoRouter = require('./todoRouter')


router.use('/auth', authRouter)
router.use('/users', userRouter)
router.use('/messages', messageRouter)
router.use('/chats', chatRouter)
router.use('/todos', todoRouter)

module.exports = router;