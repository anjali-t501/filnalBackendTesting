const Essential =  require('../../models/categories/dailyEssentials');
const catchAsyncErrors = require('../../middleware/catchAsyncError');

//Create essential category
exports.createEssentialsType = catchAsyncErrors(async (req, res, next) => {
    try {
      const essentialName = req.body.essentialName;
      const imageUrl = req.body.imageUrl;

      // Check if the essentialName already exists in the database (case-insensitive)
      const existingEssential = await Essential.findOne({ essentialName: { $regex: new RegExp(`^${essentialName}$`, "i") } });
  
      if (existingEssential) {
        return res.status(400).json({
          success: false,
          message: "this type already exists"
        });
      }
  
      // Create a new essentialName type
      const essentialT = await Essential.create({
        essentialName,
        imageUrl,
        user: req.user.id
      });
      
      res.status(201).json({
        success: true,
        essentialT
      });
    } catch (error) {
      next(error);
    }
  });

  //get all essential category
exports.allEssentialsType = catchAsyncErrors(async (req, res, next) => {
    try {
        const essentialT = await Essential.find();
        res.status(200).json({
            success: true,
            essentialT
        })
    } catch (error) {
        next(error);
    }
})


  //Update  essential category
exports.updateEssentialType = catchAsyncErrors(async (req, res, next) => {
    try {
        const essentialT = await Essential.findByIdAndUpdate(req.params.type_id, req.body, { new: true });
        res.status(200).json({
            success: true,
            essentialT
        })
    } catch (error) {
        next(error);
    }
})

  //Update  essential category
exports.deleteEssentialType = catchAsyncErrors(async (req, res, next) => {
    try {
        const essentialT = await Essential.findByIdAndRemove(req.params.type_id);
        res.status(200).json({
            success: true,
            essentialT
        })
    } catch (error) {
        next(error);
    }
})
