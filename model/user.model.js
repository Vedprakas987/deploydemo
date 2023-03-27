const mongoose = require("mongoose")

const usersShema=mongoose.Schema({
   name:String,
   email:String,
   password:String,
   gender:String
})

const UserModel=mongoose.model("facebookusers",usersShema)

module.exports={
    UserModel
}