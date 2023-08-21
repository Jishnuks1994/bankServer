

// import express
const express=require('express')

//import env file
require('dotenv').config()

//import cors file
const cors=require('cors')


//import router
// require('./routes/userRouting')
const router = require('./routes/userRouting')


//import dbConnection

require("./db/dbconnection")



// create server using express
const server=express()

//connect server using core after giving server code
server.use(cors())

//to convert all incoming jsontype data into javascript
server.use(express.json())

//tell server to use router
server.use(router)

//we have to create this path in routs folder

// server.get('/exegetpath/newuser',(req,res)=>{
//     res.send("get request response...")
// })

// server.get('/exegetpath/lastuser',(req,res)=>{
//     res.send("get request response 2...")
// })

//port set
//our front end is in 4200 you have to give a different port for server
const port=3000 || process.env.port

//running configuration
server.listen(port,()=>{
    console.log(`______server started at port number ${port}_________`);
})

