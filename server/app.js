const express=require("express");
const dotenv=require("dotenv")
const cors = require("cors");
dotenv.config();
const app=express();
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const connectDB=require("./config/db")
const workFlowRoutes=require("./routes/workFlowRoute")

app.use(cors());
app.use(express.json());

app.use(cookieParser());

const PORT=process.env.PORT

connectDB();

app.get("/",(req,res)=>{
    res.send("working")
})


app.use('/api/auth', authRoutes);
app.use("/api/workflows",workFlowRoutes)


app.listen(PORT,()=>{
    console.log(`server listening on ${PORT}`);
})
