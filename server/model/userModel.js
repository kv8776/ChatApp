const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const customError = require('./../utils/customError')
const crypto = require('crypto')
const userSchema = new mongoose.Schema({
  //name , email ,password, confirm password
  username: {
    type: String,
    min:5,
    max:20,
    unique:true,
    required: [true, 'Please enter a name']
  },
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique:true,
    lowercase: true,
    validate: [validator.isEmail, 'Please enter a valid email']
  },
  isAvatarImageSet:{
    type:Boolean,
    default:false
  },
  avatarImage:{
    type:String,
    default:""
  },
  password: {
    type: String,
    select:false,
    required: [true, 'Please enter a password'],
    minlength: 8,
    select: false
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  confirmPassword: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function (val) {
        return val == this.password
      },
      message: 'Pasword doesnt match !'
    }
  },
  active: { type: Boolean, default: true, select: false },
})
//
userSchema.post('save', function (obj, next) {
  console.log(`successfully registered with  ${obj.username}.`)
  next()
});
//
userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 12)
  this.confirmPassword = undefined
  next();
})
const User = mongoose.model('User', userSchema);
module.exports = User
