 const jwt=require('jsonwebtoken')
//creating middleware
//middleware is a function with 3 arguments
const jwtMiddleware = (req, res, next) => {

    try {
        //access token from request header
        const token = req.headers["access_token"]
        // validate token - we use vefify method inside jwt library
        jwt.verify(token,"secretKey123")  // the outcome will be true or false

        //calling next method to exit the controller from  middleware function
        next()


    }
    catch {

        res.status(404).json("Please Login")

    }
}

module.exports=jwtMiddleware