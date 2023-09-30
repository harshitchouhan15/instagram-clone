const dotenv = require("dotenv")
const jwt = require("jsonwebtoken")
dotenv.config()


const verifyToken = (req,res,next)=>{
    const authHeader = req.headers.token
    if(authHeader){
        const token = authHeader.split(" ")[1]
        jwt.verify(token , process.env.SECRET_KEY, (err,user)=>{
            if(err) return res.status(517).json("invalid token")

            req.user=user
            next()
        })

    }else{
        res.status(405).json("not allowed")
    }
}

const verifyTokenAndAuthorization = (req,res,next)=>{
    verifyToken(req,res,()=>{
        req.user.id===req.params.id || req.user.username===req.body.username ?
        next()
        : res.status(500).json("not allowed")
    })
}

module.exports = {
    verifyTokenAndAuthorization,
    verifyToken
}