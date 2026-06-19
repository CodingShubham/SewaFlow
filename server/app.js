const express=require("express");
const dotenv=require("dotenv")
dotenv.config();
const app=express();

const PORT=process.env.PORT


app.get("/",(req,res)=>{
    res.send("working")
})

app.listen(PORT,()=>{
    console.log(`server listening on ${PORT}`);
})