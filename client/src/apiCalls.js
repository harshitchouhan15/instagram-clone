import {axiosInstance} from './config'
import {getStorage,ref,uploadBytesResumable,getDownloadURL} from "firebase/storage"
import {app} from "./firebase"

export const createPost = async(details,accessToken)=>{
    try{
        const res = await axiosInstance.post("/posts/share",details,{headers:{ token: "Bearer "+accessToken }})
        window.location.reload()

    }catch(e){
        console.log(e)
    }
}



export const updateProfile=  async(id,details,accessToken,dispatch,login)=>{
  try{
      const res = await axiosInstance.put("/users/"+id,details,{headers:{ token: "Bearer "+accessToken }})
      const user=res.data
      const data={...user,accessToken:accessToken}
      dispatch(login(data))
      window.location.reload()

  }catch(e){
      console.log(e)
  }
}




  export const handleUpload=(file,createPost,details,accessToken,selected,setUploaded)=>{
    
   
    const filename=Date.now()+file.name
    const storage=getStorage(app)
    const storageRef=ref(storage,filename)
    const uploadTask = uploadBytesResumable(storageRef, file);

uploadTask.on('state_changed', 
(snapshot) => {

  const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  setUploaded( progress + '%');
  switch (snapshot.state) {
    case 'paused':
      console.log('Upload is paused');
      break;
    case 'running':
      console.log('Upload is running');
      break;
  }
}, 
(error) => {

}, 
() => {

  getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //  console.log('File available at', downloadURL);
    if(selected==='Post'){
      details.image=downloadURL
      createPost(details,accessToken)
    }else{
      details.video=downloadURL
      createPost(details,accessToken)
    }
   

 

  }).catch((err)=>console.log(err));
}
);

}


//profile photo
export const handleProfile=(file,updateProfile,id,details,accessToken,dispatch,login)=>{
    
   
  const filename=Date.now()+file.name
  const storage=getStorage(app)
  const storageRef=ref(storage,filename)
  const uploadTask = uploadBytesResumable(storageRef, file);

uploadTask.on('state_changed', 
(snapshot) => {

const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
console.log('Upload is ' + progress + '% done');
switch (snapshot.state) {
  case 'paused':
    console.log('Upload is paused');
    break;
  case 'running':
    console.log('Upload is running');
    break;
}
}, 
(error) => {

}, 
() => {

getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
 // console.log('File available at', downloadURL);
  
  details.profilePic=downloadURL
  updateProfile(id,details,accessToken,dispatch,login)



}).catch((err)=>console.log(err));
}
);

}