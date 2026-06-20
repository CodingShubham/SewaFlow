const mongoose=require("mongoose");

const workFlowSchema=new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },

    name:{
        type:String,
        require:true,
    },

    trigger:{
        type:String,
        required:true,
    },

    steps:{
        type:[String],
        required:true,
    },

    isActive:{
        type:Boolean,
        default:true,
    },

}, {timestamps:true})

module.exports=mongoose.model("WorkFlow", workFlowSchema)
