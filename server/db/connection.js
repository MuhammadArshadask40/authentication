const dotenv= require("dotenv");
dotenv.config({path: './config.env'});
var mongoose = require('mongoose');
const mongoDB = process.env.DATABASE;
mongoose.connect(mongoDB, { useNewUrlParser: true }).then(()=>{
    console.log("connection successful")
}).catch((error)=>{
console.log("error in connection")
})