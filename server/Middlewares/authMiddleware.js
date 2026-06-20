
const JWT=require("jsonwebtoken")
const User=require("../Model/User")

const authUser= async(req,res,next)=>{

    //authUser Middleware for checking the correct User for login and other Routes
try{

    const{token}=req.cookies;

    if(!token){
        return res.status(401).send("Please login again")
    }

    const decodeObj=await JWT.verify(token,process.env.JWT_SECRET);
    const{userId }=decodeObj;

    const user=await User.findById(userId);

    if(!user){
        throw new Error("User Not Found ")
    }

    req.user=user;
    next();


}


catch(err){

    res.status(500).json({error:err.message});

}



}

module.exports=authUser;