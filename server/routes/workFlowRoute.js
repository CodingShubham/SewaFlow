const express=require("express")
const router=express.Router();
const authUser=require("../Middlewares/authMiddleware")

const{createWorkFlow,getWorkFLow,getWorkflowById,updateWorkflow,deleteWorkflow}=require("../Controllers/workFlowController")

router.post("/",authUser,createWorkFlow);
router.get("/",authUser,getWorkFLow);
router.get("/:id",authUser,getWorkflowById);
router.put("/:id",authUser,updateWorkflow);
router.delete("/:id",authUser,deleteWorkflow);

module.exports=router;
