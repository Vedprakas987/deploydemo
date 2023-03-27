const express = require("express")
const { connection } = require("./connection/db")
const { Auth } = require("./middleware/Auth.middle")
const { postRouter } = require("./routes/post.routes")
const { userRouter } = require("./routes/user.routes")
const cors=require("cors")
const app = express()
app.use(cors())
app.use(express.json())
app.use("/users",userRouter)
app.use(Auth)
app.use("/posts",postRouter)
app.listen(6200,async(req,res)=>{
    try{
    await connection
    console.log("Server is running on Port 6200")
    }catch(err){
        console.log(err.massage)
    }
})