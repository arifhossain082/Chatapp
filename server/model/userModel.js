const { Schema, model } = require('mongoose');
const filePath = '/src/assets/img/';

const userSchema = new Schema({
    name: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true
      },
      status: {
        type: Boolean,
        default: false
      },
      image: {
        type: String,
        default: `${filePath}vecteezy_male-3d-avatar_27245487.png`
      }
}, {timestamps: true})

const userRegistration = model('user', userSchema);
module.exports = userRegistration;