const router = require("express").Router()
const Message = require("../models/Message")

const  {
    verifyTokenAndAuthorization,
    verifyToken
} = require("./verifyToken")
const Conversation = require("../models/Conversation")


//CREATE
router.post("/create", verifyToken, async(req,res)=>{

    try{
        const chat = await Conversation.findOne({
            members: {$all: [...req.body.members]} 
         })

            if(!chat ){
                const newChat = new Conversation(req.body) 
                
                    const savedChat= await newChat.save()
                    res.status(200).json(savedChat)
              
                    
            }else{

                res.status(200).json(chat)
            }
    }catch(e){
            res.status(500).json(e)
        }
    
})

//GET

router.get("/get/:senderId/:recieverId", verifyToken, async(req,res)=>{
    try{
        const chat = await Conversation.find({
            members: {$all: [req.params.senderId,req.params.recieverId]} })
        res.status(200).json(chat)
    }catch(e){
        res.status(500).json(e)
    }
} )

//get all user chats
router.get("/get/:senderId", verifyToken, async(req,res)=>{
    try{
        const chats = await Conversation.find({
            members: {$in: [req.params.senderId]}        })
        res.status(200).json(chats)
    }catch(e){
        res.status(500).json(e)
    }
} )

router.delete("/delete/:chatId", verifyToken, async(req,res)=>{
    try{
        const chat = await Conversation.findById(req.params.chatId)
        await Message.deleteMany({conversationId:chat._id})
        await chat.deleteOne()
        res.status(200).json('deleted')
    }catch(e){
        res.status(500).json(e)
    }
} )


module.exports = router