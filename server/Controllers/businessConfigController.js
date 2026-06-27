const BusinessConfig=require("../Model/BusinessConfig")

/**
 * @desc    Create Business Configuration
 * @route   POST /api/business-config
 * @access  Private
 */



    const createBusinessConfig = async (req,res)=>{

        try{

            const userId=req.user._id;

            const existingConfig=await BusinessConfig.findOne({userId});

            if(existingConfig){
                return res.status(409).json({success:false,message:"Business configuration already exists."})
            }


            const{businessName,industry,currency,timezone}=req.body;

            const businessConfig=await BusinessConfig.create({
                userId,
                businessName,
                industry,
                currency,
                timezone,

            })


            return res.status(201).json({
            success: true,
            message: "Business configuration created successfully.",
            data: businessConfig})

        }


        catch(error){

        console.error("Create BusinessConfig Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

        }

    }


    /**
 * @desc    Get Business Configuration
 * @route   GET /api/business-config
 * @access  Private
 */

    const getBusinessConfig = async(req,res)=>{

        try{

            const userId=req.user._id;
            const businessConfig=await BusinessConfig.findOne({userId})


               if (!businessConfig) {
            return res.status(404).json({
                success: false,
                message: "Business configuration not found."
            });
        }


         return res.status(200).json({
            success: true,
            data: businessConfig
        });


        }


        catch(error){

        console.error("Get BusinessConfig Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

        }

    }


    /**
 * @desc    Update Business Configuration
 * @route   PUT /api/business-config
 * @access  Private
 */

    const updateBusinessConfig = async (req, res) => {
    try {
        const userId = req.user.id;

        const {
            businessName,
            industry,
            currency,
            timezone,
            setupComplete
        } = req.body;

        const updatedConfig = await BusinessConfig.findOneAndUpdate(
            { userId },
            {
                businessName,
                industry,
                currency,
                timezone,
                setupComplete
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedConfig) {
            return res.status(404).json({
                success: false,
                message: "Business configuration not found."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Business configuration updated successfully.",
            data: updatedConfig
        });

    } catch (error) {
        console.error("Update BusinessConfig Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};



module.exports={createBusinessConfig,getBusinessConfig,updateBusinessConfig}



