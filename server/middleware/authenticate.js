const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");
const Authenticate = async (req,res,next) => { 
try {
const token = req.cookies.jwtoken;
const verifyToken = jwt.verify(token , process.env.SECRET_KEY);
// "tokens:token"
const rootUser = await User.findOne({ _id: verifyToken._id, "tokens:token" : token})
if(!rootUser) {throw new Error ("user not found")}
req.token = token;
req.rootUser = rootUser;
req.UserID = rootUser._id;
next();
}catch(error){
    res.status(401).send("unauthorized user no token provided")
    console.log(error)
}
}
module.exports=Authenticate;