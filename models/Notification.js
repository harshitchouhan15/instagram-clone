
const mongoose = require("mongoose")

const NotificationSchema = new mongoose.Schema({
   
    notificationId:{
        type:String,
        required:true
    },
       
    message:{
        type:Object
    }
},{timestamps:true})


module.exports = mongoose.model("Notification", NotificationSchema)