const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },

    username:{
        type:String,
        required:true,
        unique:true
    },
   email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
       
    },
    profilePic:{
        type:String,
        default:""
    },
    followers:{
        type:Array,
        default:[]
    },
    following:{
        type:Array,
        default:[]
    }
},{timestamps:true})


module.exports = mongoose.model("User", userSchema)