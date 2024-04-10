const messageModel = require('../model/messageModel');

// Create message
const createMessage = async (req, res) => {
    const { chatId, senderId, text} = req.body

    try{
      const message = new messageModel({
        chatId,
        senderId,
        text
      })
     const response = await message.save();
     res.status(200).json(response)
    }catch(error){
        console.log(error);
        res.status(400).json(error)
    }
}

//Update message
const updateMessage = async (req, res) => {
  const { messageId } = req.params;
  const data = {chatId, senderId, text} = req.body

  try{
    const messages = await messageModel.findByIdAndUpdate(messageId, {...data}, {new:true})
    if(!message){
      res.status(400).json({message: 'Message dose not exists !'})
    }
    res.status(200).json(messages)
  }catch(error){
      console.log(error);
      res.status(400).json(error)
  }
}

//Get message
const getMessage = async (req, res) => {
    const chatId = req.params.chatId;

    try{
      const messages = await messageModel.find({chatId})
      if(!messages){
        res.status(400).json({message: 'Chat is not found'})
      }
      res.status(200).json(messages)
    }catch(error){
        console.log(error);
        res.status(400).json(error)
    }
}

module.exports = {
    createMessage,
    getMessage,
    updateMessage
}