
const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    postId:{
        type:String,
        required:true
    },
   username:{
        type:String,
        required:true
    },

    image:{
        type:String,
       
        
    },
    video:{
        type:String,
       
        
    },
    profilePic:{
        type:String,
    },
   likes:{
        type:Array,
        default:[]
    },
    comments:{
        type:Array,
        default:[]
    },
    caption:{
        type:String,
        
       
    },
    isReel:{
        type:Boolean,
        default:false
    }
},{timestamps:true})


module.exports = mongoose.model("Post", postSchema)
