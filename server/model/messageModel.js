const {Schema, model} = require('mongoose');

const messageSchema = new Schema({
    chatId: String,
    senderId: String,
    text: String
}, {timestamps: true})

const messageModel = model('message', messageSchema);
module.exports = messageModel;