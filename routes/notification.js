const router = require("express").Router()
const  {
    verifyTokenAndAuthorization,
    verifyToken
} = require("./verifyToken")
const Notification = require("../models/Notification")


//CREATE
router.post("/create", verifyToken, async(req,res)=>{
    const newnotification = new Notification(req.body)

    try{
        const savednotification= await newnotification.save()
        res.status(200).json(savednotification)
    }catch(e){
        console.error(e)
            res.status(500).json(e)
        }
    
})

//GET all notifications for a user

router.get("/get/:notificationId", verifyToken, async(req,res)=>{
    try{
        const notifications = await Notification.find({
            notificationId:req.params.notificationId       })

        res.status(200).json(notifications)
    }catch(e){
        res.status(500).json(e)
    }
} )

//detele

router.delete('/:id',verifyToken, async(req,res)=>{
    try{
        await Notification.findByIdAndDelete(req.params.id)
        res.status(200).json("deleted!")
    }catch(e){
        res.status(500).json(e)
    }
} )

//detele all notifications

router.delete('/all/:id',verifyToken, async(req,res)=>{
    try{
        await Notification.deleteMany({notificationId:req.params.id})
        res.status(200).json("deleted!")
    }catch(e){
        res.status(500).json(e)
    }
} )


module.exports = router