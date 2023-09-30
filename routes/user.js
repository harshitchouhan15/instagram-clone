const router = require("express").Router()
const dotenv = require("dotenv")
const jwt = require("jsonwebtoken")
dotenv.config()
const  {
    verifyTokenAndAuthorization,
    verifyToken
} = require("./verifyToken")
const User = require("../models/User")

//GET

router.get("/:id", verifyToken, async(req,res)=>{
    try{
        const user = await User.findById(req.params.id)
        const {password,...others} = user._doc
        res.status(200).json(others)
    }catch(e){
        res.status(500).json(e)
    }
} )


//GET friends

router.get("/friends/:id", verifyToken, async(req,res)=>{
   
    try{
        const user = await User.findById(req.params.id)
       const following=await Promise.all(
            user.following.map(friend=>{
                return User.findById(friend)
                
            })
            )

            const followers=await Promise.all(
                user.followers.map(friend=>{
                    return User.findById(friend)
                    
                })
                )

            let allFollowing=[]
            following.map(i=>{
                const {password,...others}=i._doc
                allFollowing.push(others)
            })
            
            let allFollowers=[]
            followers.map(i=>{
                const {password,...others}=i._doc
                allFollowers.push(others)
            })
       
        res.status(200).json({allFollowing,allFollowers})
    }catch(e){
        res.status(500).json(e)
    }
} )

//UPDATE

router.put("/:id", verifyTokenAndAuthorization, async(req,res)=>{
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true})
        const {password,...others} = updatedUser._doc
        res.status(200).json(others)
    }catch(e){
        res.status(500).json(e)
    }
} )

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async(req,res)=>{
    try{
         await User.findByIdAndDelete(req.params.id)
        
        res.status(200).json('user deleted')
    }catch(e){
        res.status(500).json(e)
    }
} )


//FOLLOW others
router.put("/follow/:id" ,verifyToken, async(req,res)=>{
    try{
        const hero=await User.findById(req.params.id)
        const user=await User.findById(req.body.userId)
        let updatedUser;
        if(hero.followers.includes(req.body.userId)){
            await hero.updateOne({$pull : {followers: req.body.userId}})
            updatedUser= await user.updateOne({$pull : {following: req.params.id}}, {new:true})
        }else{
            await hero.updateOne({$push : {followers:req.body.userId}})
           updatedUser=  await user.updateOne({$push : {following:req.params.id}}, {new:true})
        }
        const {password,...others} = updatedUser._doc

        const accessToken = jwt.sign(
            {id: updatedUser._id,
            username:updatedUser.username
            },
            process.env.SECRET_KEY,
            {expiresIn:"2d"}
        )

        res.status(200).json({...others,accessToken})
      
    }catch(e){
        res.status(500).json(e)
    }
})


//get all users
router.get("/all/users", verifyToken, async(req,res)=>{
   let allUsers=[]
    try{
        const users = await User.find()

        users.map(user=>{
            const {password,...others} = user._doc
            allUsers.push(others)
        })
        
        res.status(200).json(allUsers)
    }catch(e){
        res.status(500).json(e)
    }
} )

//suggestions
router.get("/suggestions/users", verifyToken, async(req,res)=>{
    let allUsers=[]
     try{
         const users = await User.aggregate([{$sample:{size:5}}])
 
         users.map(user=>{
             const {password,...others} = user
             allUsers.push(others)
         })
         
         res.status(200).json(allUsers)
     }catch(e){
        console.error(e)
         res.status(500).json(e)
     }
 } )




module.exports = router