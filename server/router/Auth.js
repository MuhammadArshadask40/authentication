const bcrypt = require("bcryptjs");
const express = require("express");
const Authenticate = require("../middleware/authenticate");
require("../db/connection");
const router = express.Router();
const User = require("../model/userSchema")
router.get("/", (req,res)=>{
    res.send("home page")
})
router.get("/allData",(req,res)=>{
User.find().then(data=>{res.json(data)
})
})
router.get("/contact", (req,res)=>{
    res.cookie("contact new","b")
    res.send("hi from contact")
})
router.get("/new" , (req,res)=>{
  res.send("new")

})
router.get("/about" ,Authenticate, (req,res)=>{
 res.send(req.rootUser)
})
router.post("/register", async(req,res)=>{
    const {name,email,phone,work,password,cpassword} = req.body;
if(!name || !email || !phone ||!work ||!password || !cpassword ){
    return res.status(422).json("please field the value correctly");
}
try{
    const userExist = await User.findOne({email:email})
    if(userExist){
        return res.status(422).json({error:"Email already exist"})
        
    }
    else if(password!=cpassword){
        return res.status(422).json({error:"password is not match"})
    }
    else{
        const user = new User({name,email,phone,work,password,cpassword})
        await user.save();  
    } 
    res.status(201).json({message:"user registered successfully"})
}
catch(error){
    console.log(error)
}
})
//login route
router.post("/signin", async (req,res)=>{
    try{
      const {email,password}=req.body
      if(!email || !password){
        return res.status(400).json({error:"please field the data"})
      }
      const userLogin = await User.findOne(({email:email}))
      if(userLogin){ 
        const isMatch = await bcrypt.compare(password,userLogin.password)
       const token = await userLogin.generateAuthToken();
        res.cookie('jwtoken', token);
        if(!isMatch){
            res.json({error:"user error"})
            console.log("!Is match if") 
          }
          else{
            res.json({message:"user signin successfully"})
            console.log("!match")   
          }  
      }
      else{
        res.status(400).json({error:"invalid cre"})
        console.log("invalid cred")
      }
    }
    catch(error){
      console.log(error)
    }
})
module.exports=router
