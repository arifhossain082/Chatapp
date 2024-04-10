const jwt = require('jsonwebtoken');
const userModel = require('../model/userModel');

const authentication = async (req, res, next) => {
    try{
        let token = req.headers.authorization;
        if(!token){
            res.status(400).json({message: "Unauthorized"})
        }
        
          token = token.split(' ')[1];
          const decoded = jwt.verify(token, 'secret-key');
          const user = await userModel.findById(decoded._id);
          if(!user){
            res.status(401).json({message: "Unauthorized"})
          }
          req.user = user;
          next();
        }catch(e){
            res.status(400).json({message: "Invalid token"});
        }
}

module.exports = authentication;