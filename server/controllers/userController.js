const user = require('./../model/userModel')
const bcrypt = require('bcrypt')
const errorHandler = require('./../utils/errorhandler')
const customError = require('./../utils/customError')

module.exports.signup = errorHandler(async (req, res, next) => {
  const { username, password, email, confirmPassword } = req.body
  const userCheck = await user.findOne({ username })
  if (userCheck) {
    const error = new customError('username already exist', 400)
    return next(error)
  }
  const emailCheck = await user.findOne({ email })
  if (emailCheck) {
    const error = new customError('email already exist', 400)
    return next(error)
  }
  const USER = await user.create(req.body)
  delete USER.password
  res.status(200).json({
    status: 'success',
    USER
  })
  next()
})

//login
module.exports.login = errorHandler(async (req, res, next) => {
  const { username, password } = req.body
  const USER = await user.findOne({ username }).select('+password')

  if (!USER) {
    const error = new customError('Incorrect username or password', 400)
    return next(error)
  }
  //console.log(User)
  //console.log('Password:', password);
  //console.log('User password:', User.password);

  const isPasswordValid = await bcrypt.compare(password, USER.password)
  if (!isPasswordValid) {
    const error = new customError('Incorrect username or password', 400)
    return next(error)
  }
  delete USER.password
  res.status(200).json({
    status: 'success',
    USER
  })
  next()
})
//avatar
module.exports.setAvatar = errorHandler(async (req, res, next) => {
  const userId = req.params.id
  const avatarImage = req.body.image
  const userData = await user.findByIdAndUpdate(
    userId,
    {
      isAvatarImageSet: true,
      avatarImage
    },
    { new: true }
  )
  return res.json({
    isSet: userData.isAvatarImageSet,
    image: userData.avatarImage
  })
  next()
})

module.exports.getallusers = errorHandler(async (req, res, next) => {
  
   const users=await user.find({_id:{$ne:req.params.id}}).select([
    "email",
    "username",
    "avatarImage",
    "_id"
   ])
   res.status(200).json({
    status:"success",
    users
   })


  next()
})
