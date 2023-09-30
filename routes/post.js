const router = require("express").Router()
const  {
    verifyTokenAndAuthorization,
    verifyToken
} = require("./verifyToken")
const Post = require("../models/Post")
const User = require("../models/User")

//CREATE
router.post("/share", verifyToken, async(req,res)=>{

    const newPost = new Post(req.body)

    try{
        const savedPost = await newPost.save()

        res.status(200).json(savedPost)
    }catch(e){
        res.status(500).json(e) 
    }
})

//LIKE POST
router.put("/like/:id", verifyToken, async(req,res)=>{
    let updatedPost;
    try{
        const post = await Post.findById(req.params.id)
        if(!post.likes.includes(req.body.userId)){
            updatedPost=  await Post.findByIdAndUpdate( req.params.id, {$push : {likes: req.body.userId}} , {new:true})
        }else{
            updatedPost= await Post.findByIdAndUpdate( req.params.id, {$pull : {likes: req.body.userId}} , {new:true})
        }

        res.status(200).json(updatedPost)
    }catch(e){
        res.status(500).json(e)
    }
})

//COMMENT ON POST
router.put("/:id/comment", verifyToken, async(req,res)=>{
   
    try{
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, {$push:{comments: req.body}} , {new:true})
     
        res.status(200).json(updatedPost)
    }catch(e){
        res.status(500).json(e)
    }
})

//USER TIMELINE
router.get("/timeline/:id", verifyToken, async(req,res)=>{
    try{
        const user = await User.findById(req.params.id)
        const userPosts = await Post.find({postId: user._id})
        const friendPosts = await Promise.all(
            user.following.map(friendId=>{
                return Post.find({postId: friendId })
            })
        )
            res.status(200).json(userPosts.concat(...friendPosts))
    }catch(e){
        res.status(500).json(e)
    }
})

//GET
router.get("/:id", verifyToken, async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id)
       
        res.status(200).json(post)
    }catch(e){
        res.status(500).json(e)
    }
} )

router.get("/userposts/:id", verifyToken, async(req,res)=>{
   
    try{
        
     const posts = await Post.find({postId:req.params.id})
          res.status(200).json(posts)
        
    }catch(e){
        res.status(500).json(e)
    }
} )

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async(req,res)=>{
    try{
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true})
      
        res.status(200).json(updatedPost)
    }catch(e){
        res.status(500).json(e)
    }
} )

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async(req,res)=>{
    try{
         await Post.findByIdAndDelete(req.params.id)
        
        res.status(200).json('Post deleted')
    }catch(e){
        res.status(500).json(e)
    }
} )


//get all posts
router.get("/all/posts",  async(req,res)=>{
    
    try{
        
         const  posts = await Post.find()
         const allPosts = posts.filter(p=>p.isReel!==true)
       
            res.status(200).json(allPosts)
        
      
    }catch(e){
        res.status(500).json(e)
    }
} )

//get all reels
router.get("/all/reels",   async(req,res)=>{
    
    try{
        
         const  posts = await Post.find({isReel:true})
       
            res.status(200).json(posts)
        
      
    }catch(e){
        res.status(500).json(e)
    }
} )

//get 4 random posts
router.get("/random/posts", verifyToken,  async(req,res)=>{
    
    try{
        
         const  posts = await Post.find().limit(4)
       
       
            res.status(200).json(posts)
        
      
    }catch(e){
        res.status(500).json(e)
    }
} )

module.exports = router