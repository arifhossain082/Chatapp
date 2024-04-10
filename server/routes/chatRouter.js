const express = require('express')
const { findUserChat, findChat, createGroupChat, createChat, addMembersToGroupChat } = require('../controller/chatController')

const router = express.Router()

router.post('/', createChat)
router.post('/groupChat', createGroupChat)
router.get('/:userId', findUserChat)
router.get('/find/:firstId/:secondId', findChat)
router.post('/addMembers', addMembersToGroupChat)

module.exports = router;