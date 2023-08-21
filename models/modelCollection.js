//import mongoose
const mongoose=require('mongoose')

//create model for collections
//schema feilds and values of collection

//users
const users=new mongoose.model("users",{
    acno:Number,
    uname:String,
    psw:String,
    balance:Number,
    transactions:[]
})

//export users to access in contolller

module.exports=users