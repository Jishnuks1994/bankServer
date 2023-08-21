//import express
const express=require('express')

//import from cotrollers
const logic=require('../controllers/logic')

//import routerMiddleware
const jwtMiddleware = require('../middlewares/routerMiddleware')


//create an object for router class in express to use routing
//it is used to se path

const router=new express.Router()

//creating request to register
router.post('/bankuser/user-register',logic.register)

//creating path request for log in
router.post('/bankuser/user-login',logic.login)

//user-profile path
router.get('/bankuser/user-profile/:acno',jwtMiddleware,logic.getProfile)

//user-balance path
router.get('/bankuser/user-balance/:acno',jwtMiddleware,logic.getBalance)

//money transfer
router.post('/bankuser/money-transfer',jwtMiddleware,logic.moneyTransfer)

//transaction history
router.get('/bankuser/user-history/:acno',jwtMiddleware,logic.history)

//delete account
router.delete('/bankuser/user-delete/:acno',jwtMiddleware,logic.deleteAc)

//you have to export the router to import in index.html

//export router
module.exports=router
