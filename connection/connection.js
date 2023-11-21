const mongoose=require("mongoose")
const conn=async(url)=>{
    try{
        await mongoose
        .connect(url)
        .then(()=>{ console.log("Connected")})
    }
    catch(error){
        console.log("Connection failed",error.message);
    }
};
module.exports=conn;