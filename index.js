const express=require ("express")
const app=express()
const cors=require('cors')
const conn=require('./connection/connection')
require('dotenv').config();
const path=require('path');
const User=require('./models/users');
const List=require("./models/list")

// const __dirname=path.resolve();

const auth=require("./routes/auth");
const list=require("./routes/list")

app.use(express.json())
app.use(cors())
app.get("/",(req,res)=>{
    res.status(200).json({message:"Backend is live now",users:"give: <link>/users",lists:"give: <link>/lists",allTasksofuser: "give:<link>/getTasks/_id"})
})
app.get("/users",async (req,res)=>{
    const allusers=await User.find();
    res.status(200).json({data:allusers});
})

app.get("/lists",async (req,res)=>{
    const alllists=await List.find();
    res.status(200).json({data:alllists});
})


app.use("/api/v1",auth);
app.use("/api/v2",list);

app.use(express.static(path.join(__dirname,"./frontend/build")));

app.get('*',function(_,res){
    res.sendFile(path.join(__dirname,"./frontend/build/index.html"),function(err){
        res.status(500).send(err);
    })
})

const PORT=process.env.PORT || 1000;

app.listen(PORT,()=>{
    console.log("Server started");
    conn(process.env.MONGO_URI)
});
