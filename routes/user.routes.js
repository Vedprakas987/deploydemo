const express = require("express")
const { UserModel } = require("../model/user.model")
const userRouter = express.Router()
const bcrypt = require("bcrypt")
const jsw=require("jsonwebtoken")
userRouter.use(express.json())
userRouter.post("/register", (req,res)=>{
    const {email,password,name,gender}=req.body
        bcrypt.hash(password, 3, function(err, hash) {
            const new_data = new UserModel({email:email,password:hash,name:name,gender:gender})
            new_data.save()
        });
        res.send({"msg":"new data is posted"})
   
})

userRouter.post("/login",async(req,res)=>{
   const {email,password} = req.body
   const user = await UserModel.find({email})
   console.log(user)
   if(user){
   bcrypt.compare(password,user[0].password, function(err, result) {
   if(result){
    res.send({"msg":"login Sucessfull",token:jsw.sign({"userID":user[0]._id},"masai")})
   }else{
    res.send({"msg":"please fill correct detail"})
   }
});
   }
})
userRouter.get("/",async(req,res)=>{
    try{
    const data = await UserModel.find()
    res.send(data)
    console.log(data)
    }catch(err){

    }
})


module.exports={
    userRouter
}