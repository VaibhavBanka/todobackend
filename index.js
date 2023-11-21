const express=require ("express")
const app=express()
const cors=require('cors')
const conn=require('./connection/connection')
require('dotenv').config();
const path=require('path');

// const __dirname=path.resolve();

const auth=require("./routes/auth");
const list=require("./routes/list")

app.use(express.json())
app.use(cors())
app.get("/",(req,res)=>{
    res.send("Hello")
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
