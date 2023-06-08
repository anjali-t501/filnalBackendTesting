const Animal =  require('../../models/categories/animal');
const catchAsyncErrors = require('../../middleware/catchAsyncError');


//Create animal category
exports.createAnimalType = catchAsyncErrors(async (req, res, next) => {
    try {
      const animalName = req.body.animalName;
      const imageUrl = req.body.imageUrl;

      // Check if the animalName already exists in the database (case-insensitive)
      const existingAnimal = await Animal.findOne({ animalName: { $regex: new RegExp(`^${animalName}$`, "i") } });
  
      if (existingAnimal) {
        return res.status(400).json({
          success: false,
          message: "Animal type already exists"
        });
      }
  
      // Create a new animal type
      const animalT = await Animal.create({
        animalName,
        imageUrl,
        user: req.user.id
      });
      
      res.status(201).json({
        success: true,
        animalT
      });
    } catch (error) {
      next(error);
    }
  });
  
  

//get all animals category
exports.allAnimalType = catchAsyncErrors(async (req, res, next) => {
    try {
        const animalT = await Animal.find();
        res.status(200).json({
            success: true,
            animalT
        })
    } catch (error) {
        next(error);
    }
})

//update animal type
exports.updateAnimalType = async (req, res, next) => {
    try {
        const animalT = await Animal.findByIdAndUpdate(req.params.type_id, req.body, { new: true });
        res.status(200).json({
            success: true,
            animalT
        })
    } catch (error) {
        next(error);
    }
}


//delete animal type
exports.deleteAnimalType = async (req, res, next) => {
    try {
        const animalT = await Animal.findByIdAndRemove(req.params.type_id);
        res.status(200).json({
            success: true,
            animalT
        })
    } catch (error) {
        next(error);
    }
}
