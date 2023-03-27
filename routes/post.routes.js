const express=require("express")
const { PostModel } = require("../model/post.model")
const { UserModel } = require("../model/user.model")
const jwt = require("jsonwebtoken")
const postRouter=express.Router()


postRouter.post("/add", async(req,res)=>{
    const payload = req.body
    console.log(req.body)
    try{
        const new_data = new PostModel(payload)
       await new_data.save()
       res.send({"msg":"new notes posted"})
    }catch(err){
        res.send({"msg":err.massage})
    }
})

postRouter.get("/",async(req,res)=>{
    const token = req.headers.authorization
    const decoded = jwt.verify(token, 'masai');
    console.log("decoded",decoded.userID)
    try{
        const data = await PostModel.find({"userID":decoded.userID})
        res.send(data)
    }catch(err){
        res.send({"msg":err.massage})
    }
})

postRouter.delete("/delete/:postID",async(req,res)=>{
    console.log("super")
    const {postID} = req.params
    try{
   await PostModel.findByIdAndDelete({_id:postID})
   res.send({"msg":"This post is deleted"})
    }catch(err){
    res.send({"msg":err.massage})
    }
})

postRouter.patch("/update/:postID",async (req,res)=>{
    const {postID} = req.params
    const payload = req.body
    try{
    await PostModel.findByIdAndUpdate({_id:postID},payload)
    res.send({"msg":"This post is updated"})
    }catch(err){
     res.send({"msg":"There is something Wrong"})
    }
})

module.exports={
    postRouter
}