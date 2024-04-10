const { findUserByProperty, createUser } = require('../service/user');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerController = async (req, res, next) => {
    const {name, email, password} = req.body;
    if(!name || !email || !password){
        return res.status(400).json({message: "Please submit your information"});
    }
    try{
        let user = await findUserByProperty('email', email);
        if(user){
            return res.status(400).json({message: 'User already exists'});
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        createUser({name, email, password: hash})
        const payload = {
            name: name,
            email: email
        }
        const token = jwt.sign(payload, 'secret-key', {expiresIn: '2h'})
        return res.status(201).json({name, email, token})
    }catch(error){
        console.log(error)
        res.status(400).json(error)
     }
    
}

const loginController = async (req, res) => {
    const{email, password} = req.body;
    if(!email || !password){
        return res.status(400).json({message: "Please enter your Credentials"});
    }
    try{
        const user = await findUserByProperty('email', email)
        if(!user){
            return res.status(400).json({message: 'Invalid Credential'})
        }
    
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
           return res.status(400).json({message: 'Invalid Credential'})
        }
    
        const payload = {
            _id: user._id,
            name: user.name,
            email: user.email
        }
        const token = jwt.sign(payload, 'secret-key', {expiresIn: '2h'})
     return res.status(201).json({_id: user._id, name:user.name, email, image:user.image, token})
    }catch(e){
        console.log(e);
        res.status(500).json(e)
    }
};

module.exports = {registerController, loginController}