const chatModel = require('../model/chatModel')

const createChat = async (req, res)=>{
    const {firstId, secondId} = req.body
  
    try{
       const chat = await chatModel.findOne({
          members: {$all: [firstId, secondId]}
       })
       if(chat) return res.status(200).json(chat)
  
       const newChat = new chatModel({
          members : [firstId, secondId]
       })
       const response = await newChat.save()
       res.status(200).json(response)
    }catch(error){
      console.log(error);
      res.status(400).json(error)
    }
  
  }

const createGroupChat = async (req, res) => {
    const { name, description, members } = req.body;

    try {
        const chat = await chatModel.findOne({
            name: name
        });

        if (chat) {
            return res.status(200).json(chat); // Return the chat if it already exists
        }

        // If the chat doesn't exist, create a new one
        const newChat = new chatModel({
            name : name, 
            description: description,
            members: members,
        });

        const response = await newChat.save();
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
};

const addMembersToGroupChat = async (req, res) => {
    const { chatId, newMembers } = req.body;
    try {
        // Assuming you have a GroupChat model with members field
        const groupChat = await chatModel.findById(chatId);
        if (!groupChat) {
            return res.status(404).json({ error: 'Group chat not found' });
        }
        
        // Add new members to the group chat
        newMembers.forEach(memberId => {
            if (!groupChat.members.includes(memberId)) {
                groupChat.members.push(memberId);
            }
        });

        // Save the updated group chat
        await groupChat.save();

        return res.status(200).json({ message: 'New members added successfully' });
    } catch (error) {
        console.error('Error adding members to group chat:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
  
  const findUserChat = async (req, res) => {
      const userId = req.params.userId
  
      try{
         const chats = await chatModel.find({
          members : {$in: [userId]}
         })
         res.status(200).json(chats)
      }catch(error){
          console.log(error);
          res.status(400).json(error)
      }
  }
  
  const findChat = async (req, res) => {
      const {firstId, secondId} = req.params
  
      try{
         const chat = await chatModel.findOne({
          members: {$all : [firstId, secondId]}
         })
         res.status(400).json(chat)
      }catch(error){
          console.log(error);
          res.status(400).json(error)
      }
  }
  
  
  module.exports = {
      findUserChat,
      findChat,
      createGroupChat,
      createChat,
      addMembersToGroupChat
  }