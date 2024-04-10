const { Schema, model } = require('mongoose');

const todoSchema = new Schema({
    userId: String,
    text: String,
    status:{
        type: String,
        enum: ['NOTCOMPLETE', 'COMPLETED'],
        default: 'NOTCOMPLETE'
    }
}, {timestamps: true})

const todoModel = model('todo', todoSchema);
module.exports = todoModel;