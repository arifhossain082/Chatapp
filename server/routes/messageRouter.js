const express = require('express')
const { createMessage, getMessage, updateMessage } = require('../controller/messageController')

const router = express.Router()

router.post('/', createMessage)
router.get('/:chatId', getMessage);
router.put('/:messageId', updateMessage)

module.exports = router;