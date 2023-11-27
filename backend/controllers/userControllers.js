const asynchandler = require('express-async-handler')
const User = require('../Models/Usermodel')
const generatetoken = require('../config/generatetoken')


const registerUser = asynchandler(async(req,res)=>{
      const {name,email,password,pic} = req.body;
      if(!name || !email || !password){
        res.status(400);
        throw new Error("Please enter all Fields");
      }
       const userexists = await User.findOne({ email });

      if(userexists){
         res.status(400);
         throw new Error("User Already Exists");
      }
      const user = await User.create({
        name,
        email,
        password,
        pic
      })
      if(user){
         res.status(201).json({
            _id:user.id,
            name:user.name,
            email:user.email,
            pic:user.pic,
            token:generatetoken(user._id)
         })
      }else{
         res.status(400);
         throw new Error("Failed to create user");
      }
})

const authUser = asynchandler(async(req,res) =>{
   const {email,password} = req.body;
   const user = await User.findOne({ email });
   if(user && (await user.matchpassword(password))){
      res.status(200).json({
         _id:user.id,
         name:user.name,
         email:user.email,
         pic:user.pic,
         token:generatetoken(user._id),
         })
   }else{
      res.status(401);
      throw new Error("Invalid Email or Password")
   }
})

const alluser = asynchandler( async(req,res) =>{
const keyword = req.query.search ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword)
  res.send(users);
})

module.exports = { registerUser, authUser, alluser };