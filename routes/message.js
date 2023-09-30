const router = require("express").Router()
const  {
    verifyTokenAndAuthorization,
    verifyToken
} = require("./verifyToken")
const Message = require("../models/Message")


//CREATE
router.post("/send", verifyToken, async(req,res)=>{
    const newMessage = new Message(req.body)

    try{
        const savedMessage= await newMessage.save()
        res.status(200).json(savedMessage)
    }catch(e){
            res.status(500).json(e)
        }
    
})

//GET all messages from a chat

router.get("/get/:chatId", verifyToken, async(req,res)=>{
    try{
        const messages = await Message.find({
            conversationId:req.params.chatId       })

        res.status(200).json(messages)
    }catch(e){
        res.status(500).json(e)
    }
} )





module.exports = router