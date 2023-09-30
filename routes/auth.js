const router = require("express").Router()
const dotenv = require("dotenv")
const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
dotenv.config()


//REGISTER
router.post("/register", async(req,res)=>{
    const salt= await bcrypt.genSalt(10)
    req.body.password = await bcrypt.hash(req.body.password,salt)
    const newUser = new User(req.body)
    try{
        const savedUser = await newUser.save();
        const {password,...others} = savedUser._doc

        const accessToken = jwt.sign(
            {id: savedUser._id,
            username:savedUser.username
            },
            process.env.SECRET_KEY,
            {expiresIn:"2d"}
        )

        res.status(200).json({...others,accessToken})

    }catch(e){
        res.status(500).json(e)
    }
})




//LOGIN
router.post("/login", async(req,res)=>{
    
    try{
        const user = await User.findOne({username:req.body.username});
        if(!user){
            const userByEmail = await User.findOne({email:req.body.username})
            if(!userByEmail) return res.status(404).json("user not found!")
            const validated = await bcrypt.compare(req.body.password, userByEmail.password)
            if(!validated) return res.status(400).json("wrong credentials")

            const {password,...others} = userByEmail._doc
            
            const accessToken = jwt.sign(
                {id: userByEmail._id,
                username:userByEmail.username
                },
                process.env.SECRET_KEY,
                {expiresIn:"2d"}
            )
    
            res.status(200).json({...others,accessToken})
        }else{
            const validated = await bcrypt.compare(req.body.password, user.password)
            if(!validated) return res.status(400).json("wrong credentials")
    
            const {password,...others} = user._doc
    
            const accessToken = jwt.sign(
                {id: user._id,
                username:user.username
                },
                process.env.SECRET_KEY,
                {expiresIn:"2d"}
            )
    
            res.status(200).json({...others,accessToken})
        }
 }catch(e){
    console.error(e)
        res.status(500).json(e)
    }
})


module.exports = router