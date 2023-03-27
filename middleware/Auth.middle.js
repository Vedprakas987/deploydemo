const jwt = require("jsonwebtoken")
const Auth=(req,res,next)=>{
    const token = req.headers.authorization
    console.log("token",token)
    if(token){
        console.log("hello")
    const decoded = jwt.verify(token, 'masai');
    console.log("decoded",decoded)
     req.body.userID=decoded.userID
     next()
    }
}

module.exports={
    Auth
}