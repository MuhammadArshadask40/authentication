const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const dotenv= require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config({path: './config.env'});
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    work:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    cpassword:{
        type:String,
        required:true,
    },
    tokens:[
        {
        token:{
            type:String,
            required:true
        }
    }]
})

// hashing password
userSchema.pre('save', async function (next){
if (this.isModified('password'))
{
    this.password = await bcrypt.hash(this.password,12)
    this.cpassword = await bcrypt.hash(this.cpassword,12)
}
next();
})
// generate authintication token
userSchema.methods.generateAuthToken = async function (){
    try{
        let token = jwt.sign({_id:this._id},process.env.SECRET_KEY);
        this.tokens=this.tokens.concat({token:token});
        await this.save();
        return token;
    }
    catch(error){
        console.log(error)
    }
}
const User = mongoose.model('USER',userSchema);
module.exports = User;