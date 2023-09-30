const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const path = require('path')
const authRoute = require("./routes/auth")
const userRoute = require("./routes/user")
const postRoute = require("./routes/post")
const chatRoute = require("./routes/conversation")
const messageRoute = require("./routes/message")
const notificationRoute =  require("./routes/notification")
const io = require("socket.io")(8900,{
    cors:{
        origin: "http://localhost:3000"
    }
})

dotenv.config()

mongoose.connect(process.env.MONGO_URL).then(()=>console.log("db connection successful.")).catch((e)=>console.log(e))

const app= express()
app.use(express.json())

app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/posts", postRoute)
app.use("/api/chats", chatRoute)
app.use("/api/messages", messageRoute)
app.use('/api/noti', notificationRoute)


app.listen(5500, ()=>console.log("backend is running."))

app.use(express.static(path.join(__dirname, "/client/build")));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});


//socket server implementation 

let users = []


const addUser = (userId,socketId)=>{
   const index=  users.findIndex(u=>u.userId===userId)
  
   if(index>=0){
    users[index]={userId,socketId}
   }else{
    users.push({userId,socketId})
   }
   console.log(users)
}

const removeUser = (socketId)=>{
    users=users.filter(user=>user.socketId!==socketId)
}

const getUser=(recieverId)=>{
    return users.find(u=>u.userId===recieverId)
}




io.on("connection", (socket)=>{
// console.log("a user connected", users, users.length)

//add user
socket.on("addUser", (userId)=>{
     addUser(userId,socket.id)
   io.emit("getUsers",users)
})

//get and send message
socket.on("getMessage", ({senderId,recieverId,text})=>{
    const user=getUser(recieverId)
    if(user?.socketId){
        io.to(user?.socketId).emit("sendMessage", {senderId,text})
    }
   
})

//send following notification
socket.on('startedFollowing',({userId,profileId,text})=>{
  
    const user = getUser(profileId)
    io.to(user.socketId).emit('followerNotification', {userId,profileId,text})
})

//send post liked noti
socket.on('postLiked',({postId,profileId,text})=>{
    console.log(text)
    const user = getUser(profileId)
    socket.to(user?.socketId).emit('getLikedNoti', {postId,profileId,text})
})

//send post commented noti
socket.on('postCommented',({postId,profileId,text})=>{
    const user = getUser(profileId)
    socket.to(user?.socketId).emit('getCommentedNoti', {postId,profileId,text})
})



//disconnect user
socket.on('disconnect',()=>{
    console.log("a user disconnected")
    removeUser(socket.id)
    io.emit("getUsers",users)
})


})
