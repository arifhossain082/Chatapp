const { Schema, model} = require('mongoose');
const filePath = '/src/assets/img/';

const chatSchema = new Schema({
    name: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: 'Share project files, manage tasks and get updates'
    },
    image:{
        type: String,
        default: `${filePath}chat.jpg`
    },
    members: Array,
}, {timestamps: true})

const chatModel = model('chat', chatSchema);

module.exports = chatModel;
