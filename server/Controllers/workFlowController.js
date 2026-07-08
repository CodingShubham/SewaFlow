const WorkFlow = require("../Model/WorkFlow");

const createWorkFlow=async(req,res)=>{

    try{

        const {
        businessConfigId,
        name,
        template,
        config
    } = req.body;

    let trigger = "";
    let steps = [];

    switch (template) {

    case "whatsapp-order":

        trigger = "whatsapp_message";

        steps = [
            "parseOrder",
            "createCustomer",
            "createOrder",
            "updateInventory",
            "generateInvoice",
            "notifyCustomer"
        ];

        break;

    default:

        return res.status(400).json({
            message: "Unknown template"
        });

}

        // const exists=await WorkFlow.findOne({userId:req.user._id});

        // if(exists){
        // return res.status(400).json({messsage:"Workflow already exists"})
        // }

              const newWorkflow = await WorkFlow.create({
              userId: req.user._id,
              businessConfigId,
              name,
              trigger,
              steps,
              template,
              config
          });

        res.status(201).json(newWorkflow );

    }

    catch(error){

        res.status(500).json({message:error.message});

    }

}


const getWorkFLow=async(req,res)=>{

    try{

        const workflows=await WorkFlow.find({userId:req.user._id});
        res.status(201).json(workflows);
    }

    catch(error){

        res.status(500).json({message:error.message})

    }

}


const getWorkflowById = async (req, res) => {
  try {
    const workflow = await WorkFlow.findOne({ _id: req.params.id, userId: req.user._id });
    if (!workflow) {
      return res.status(404).json({ message: 'Workflow not found' });
    }
    res.status(200).json(workflow);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const updateWorkflow = async (req, res) => {
  try {

    const updateData = {};

if (req.body.name !== undefined)
    updateData.name = req.body.name;

if (req.body.trigger !== undefined)
    updateData.trigger = req.body.trigger;

if (req.body.steps !== undefined)
    updateData.steps = req.body.steps;

if (req.body.template !== undefined)
    updateData.template = req.body.template;

if (req.body.config !== undefined)
    updateData.config = req.body.config;

if (req.body.isActive !== undefined)
    updateData.isActive = req.body.isActive;

const workflow = await WorkFlow.findOneAndUpdate(
    {
        _id: req.params.id,
        userId: req.user._id
    },
    updateData,
    {
        new: true,
        runValidators: true
    }
);

    if (!workflow) {
      return res.status(404).json({ message: 'Workflow not found' });
    }
    res.status(200).json(workflow);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const deleteWorkflow = async (req, res) => {
  try {
    const workflow = await WorkFlow.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!workflow) {
      return res.status(404).json({ message: 'Workflow not found' });
    }
    res.status(200).json({ message: 'Workflow deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports={createWorkFlow,getWorkFLow,getWorkflowById,updateWorkflow,deleteWorkflow}