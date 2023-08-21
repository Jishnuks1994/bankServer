//import jwt
const jwt=require('jsonwebtoken')

//import model to access db
const users = require("../models/modelCollection")



//logic for register
//you have to create it as function
const register = (req, res) => { //body ={acno:123,uname:"anu",psw:"abc123"}
    //acess satas from body (body has json type data)
    const acno = req.body.acno
    const uname = req.body.uname
    const psw= req.body.psw

    //check acno is present in users collection
    users.findOne({ acno }).then(user => {
        if (user) {
            res.status(401).send("user alerady exist")
        }
        else {
            //register user - create a new object
            var newUser = new users({
                acno,
                uname,
                psw,
                balance:0,
                transactions: []
            })
            //save the object in collection
            newUser.save()  

            //convert the data to json and sent it to front end
            res.status(200).json(newUser)
        }
    })


}

//log in function

const login=(req,res)=>{ //body={acno:1000,psw:"abc123"}
    const {acno,psw}=req.body
    users.findOne({acno,psw}).then(user=>{
        if(user){
            //code for token generation
            var token=jwt.sign({acno},"secretKey123")
            user["token"]=token
            res.status(200).json({
                acno:user.acno,
                uname:user.uname,
                token
            })
        }
        else{
            res.status(401).json("incorrect account number or password")
        }
    })

}

//logic to get profile datas
const getProfile=(req,res)=>{
    //access acno param from url req
    const {acno}=req.params
    users.findOne({acno}).then(user=>{
        if(user){
            res.status(200).json({
                acno:user.acno,
                uname:user.uname
            })
        }
        else{
            res.status(401).json("user not exist")
        }
    })
}

//logic fot get balance

const getBalance=(req,res)=>{
    //access acno from param from url req
    const {acno}=req.params
    users.findOne({acno}).then(user=>{
        if(user){
            res.status(200).json({
                acno:user.acno,
                uname:user.uname,
                balance:user.balance
            })
        }
        else{
            res.status(401).json("user not exist")
        }
    })
}

const moneyTransfer=(req,res)=>{
    //access all datas from body
 const {fromAcno,toAcno,psw,amount,date}=req.body

 //convert amountt to number
var amnt=parseInt(amount)

//check from user in db
users.findOne({acno:fromAcno,psw}).then(fromUser=>{
if(fromUser){
    //check for to user
    users.findOne({acno:toAcno}).then(toUser=>{
        if(toUser){
            //from balance check
            if(amnt<=fromUser.balance){
                fromUser.balance-=amnt
                fromUser.transactions.push({type:"DEBIT",amount:amnt,date,user:toUser.uname})
                fromUser.save()

                toUser.balance+=amnt
                toUser.transactions.push({type:"CREDIT",amount:amnt,date,user:fromUser.uname})
                toUser.save()

                res.status(200).json({message:"transaction success"})
            }
            else{
                res.status(401).json({message:"insufficient balance"})
            }

        }
        else{
            res.status(401).json({message:"invalid credit credentials"})
        }
    })
}
else{
    res.status(401).json({message:"invalid debit credentials"})
}
})
}

//logic for transaction history
const history=(req,res)=>{

    const {acno}=req.params
    users.findOne({acno}).then(user=>{
        if(user){
            res.status(200).json(user.transactions)
        }
        else{
            res.status(401).json("user not exist")
        }
    })
}

const deleteAc=(req,res)=>{
    const {acno}=req.params
    users.deleteOne({acno}).then(user=>{
        if(user){
            res.status(200).json("Account deleted successfully")
        }
        else{
            res.status(401).json("user not exist")
        }
    })
}

module.exports = {
    register,
    login,
    getProfile,
    getBalance,
    moneyTransfer,
    history,
    deleteAc
}