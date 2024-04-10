const userModel = require('../model/userModel');
const userService = require('../service/user');
const authService = require('../service/auth')
const error = require('../utils/error');

const createNewUser = async (req, res, next)=>{
   const {name, email, password, image} = req.body;
   try{
    const user = await authService.registerService({name, email, password, image})
    return res.status(201).json(user)
   }catch(e){
     next(e)
   }
}


const updateUser = async (req, res, next) => {
    const userId = req.params.userId;
    const {name, email, password, image} = req.body;
    try{
      const user = await userService.userUpdate(userId, {
         name,
         email,
         password,
         image
      });
      if(!user){
        throw error('User not exists', 400);
      }
      res.status(201).json(user)
    }
    catch(e)
    {
      next(e)
    }
}


const getUserById = async (req, res, next) => {
  const userId = req.params.id
  try{
    if(!userId) {
      throw new Error('User ID is missing from the request parameters.');
    }
    const user = await userModel.findById(userId);
    if(!user){
        return res.status(400).json({message: 'User not found'})
    }
    delete user.password;
    return res.status(201).json(user);
  }catch(e){
      next(e)
  }
}

const getAllUser = async (req, res, next) => {
  try{
      const users = await userService.findUsers();
      return res.status(200).json(users);
  }catch(e){
      next(e)
  }
}


module.exports = {
  getAllUser,
  getUserById,
  updateUser,
  createNewUser
}