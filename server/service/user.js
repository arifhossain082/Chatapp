const UserModel = require("../model/userModel");
const error = require("../utils/error")

const findUserByProperty = (key, value) => {
    if(key === '_id'){
        return UserModel.findById(value);
    }
    return UserModel.findOne({[key]: value});
}

const createUser = ({name, email, status, password}) => {
    const user = new UserModel({
        name,
        email,
        status: status ? status: true,
        password
    })
    return user.save();
}

const userUpdate = async (id, data) => {
     const user = await findUserByProperty('email', data.email);
     if(!user){
        throw error('User dose not exists', 400)
     }
     return UserModel.findByIdAndUpdate(id, {...data}, {new:true});
}


const findUsers = ()=> {
    return UserModel.find()
}


module.exports = {findUserByProperty, createUser, userUpdate, findUsers}