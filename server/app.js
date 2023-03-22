const express = require("express");
const app=express();
const cors = require("cors");
const cookieParser = require('cookie-parser')
const bodyParser = require("body-parser")
const dotenv= require("dotenv");
dotenv.config({path: './config.env'});
require("./db/connection");
app.use(cookieParser());
app.use(express.json());
app.use(cors({origin:true,credentials:true}))
// const route=require("./router/Auth")
app.use(require('./router/Auth'));
// const corsOptions ={
//    origin:'*', 
//    credentials:true,            //access-control-allow-credentials:true
//    optionSuccessStatus:200,
   
// }

// app.use(cors(corsOptions))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const User = require("./model/userSchema.js");
const middleware = (req, res) =>{
    console.log("hello from middleware")
}
middleware();
app.listen(process.env.PORT,()=>{
    console.log("server is running at port "+process.env.PORT)
})