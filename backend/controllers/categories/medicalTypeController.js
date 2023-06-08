const Medical =  require('../../models/categories/medicalCareModel');
const catchAsyncErrors = require('../../middleware/catchAsyncError');

//Create Medical category
exports.createMedicalType = catchAsyncErrors(async (req, res, next) => {
    try {
      const medicalCareName = req.body.medicalCareName;
      const imageUrl = req.body.imageUrl;

      // Check if the medicalCareName already exists in the database (case-insensitive)
      const existingMedical = await Medical.findOne({ medicalCareName: { $regex: new RegExp(`^${medicalCareName}$`, "i") } });
  
      if (existingMedical) {
        return res.status(400).json({
          success: false,
          message: "this type already exists"
        });
      }
  
      // Create a new medicalCare type
      const MedicalT = await Medical.create({
        medicalCareName,
        imageUrl,
        user: req.user.id
      });
      
      res.status(201).json({
        success: true,
        MedicalT
      });
    } catch (error) {
      next(error);
    }
  });

  //all medicalcare category
exports.allmedicalCareType = async (req, res, next) => {
    try {
        const medicalT = await Medical.find();
        res.status(200).json({
            success: true,
            medicalT
        })
    } catch (error) {
        next(error);
    }
}
  //update medicalcare category
exports.updatemedicalCareType = async (req, res, next) => {
    try {
        const medicalT = await Medical.findByIdAndUpdate(req.params.type_id, req.body, { new: true });
        res.status(200).json({
            success: true,
            medicalT
        })
    } catch (error) {
        next(error);
    }
}
  //delete medicalcare category
exports.deleteMedicalCareType = async (req, res, next) => {
    try {
        const medicalT = await Medical.findByIdAndRemove(req.params.type_id);
        res.status(200).json({
            success: true,
            medicalT
        })
    } catch (error) {
        next(error);
    }
}