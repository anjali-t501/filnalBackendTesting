const Treatment =  require('../../models/categories/treatmentModle');
const catchAsyncErrors = require('../../middleware/catchAsyncError');

//Create treatment category
exports.createTreatmentType = catchAsyncErrors(async (req, res, next) => {
    try {
      const TreatmentTypeName = req.body.TreatmentTypeName;
      const imageUrl = req.body.imageUrl;
      
      // Check if the TreatmentTypeName already exists in the database (case-insensitive)
      const existingTreatment = await Treatment.findOne({ TreatmentTypeName: { $regex: new RegExp(`^${TreatmentTypeName}$`, "i") } });
  
      if (existingTreatment) {
        return res.status(400).json({
          success: false,
          message: "This type already exists"
        });
      }
  
      // Create a new treatment type
      const treatmentT = await Treatment.create({
        TreatmentTypeName,
        imageUrl,
        user: req.user.id
      });
      
      res.status(201).json({
        success: true,
        treatmentT
      });
    } catch (error) {
      next(error);
    }
  });
  
  

//get all treatment category
exports.allTreatmentType = catchAsyncErrors(async (req, res, next) => {
    try {
        const treatmentT = await Treatment.find();
        res.status(200).json({
            success: true,
            treatmentT
        })
    } catch (error) {
        next(error);
    }
})

//update treatment type
exports.updatetreatmentType = async (req, res, next) => {
    try {
      const treatmentT = await Treatment.findByIdAndUpdate(req.params.type_id, req.body, { new: true });
      
      if (!treatmentT) {
        return res.status(404).json({
          success: false,
          message: "Treatment type not found"
        });
      }
      
      res.status(200).json({
        success: true,
        treatmentT
      });
    } catch (error) {
      next(error);
    }
  };
  


//delete treatment type
exports.deleteTreatmentType = async (req, res, next) => {
    try {
      const treatmentT = await Treatment.findOneAndDelete({ _id: req.params.type_id });
      
      if (!treatmentT) {
        return res.status(404).json({
          success: false,
          message: "Treatment type not found"
        });
      }
      
      res.status(200).json({
        success: true,
        treatmentT
      });
    } catch (error) {
      next(error);
    }
  };
  
