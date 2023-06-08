const catchAsyncError = require('../middleware/catchAsyncError');
const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorhandler');
const logger =  require('../utils/logger');



//create product
exports.createProduct = catchAsyncError(async (req, res, next) => {
    try {

        req.body.user = req.user.id;
        const product = await Product.create(req.body);


        res.status(201).json({
            success: true,
            product,
        });
        logger.info("product created")
    } catch (error) {
        next(error);
        logger.error("product not created !")
    }
    
});


//single product detail
exports.getProductDetails =  catchAsyncError(async(req,res,next)=>{
  const product = await Product.findById(req.params.id);

  if(!product){
      return next(new ErrorHandler("product Not found",404))
  }

  

  res.status(200).json({
      success:true,
      product
  })

  logger.info("single product detail")
})

//Update Product -- Admin

exports.updateProduct =catchAsyncError( async (req,res)=>{
  let product = Product.findById(req.params.id);

  if(!product){
      return next(new ErrorHandler("product Not found",404))
  }


  product =  await Product.findByIdAndUpdate(req.params.id,req.body,{
      new:true,
      runValidators:true,
      useFindAndModify:false
  });

  res.status(200).json({
      success:true,
      product
  })

  logger.info("product Updated !")
})

//delete product --admin

exports.deleteProduct = catchAsyncError(async (req,res,next)=>{

  const product = await Product.findById(req.params.id);

  if(!product){
      return next(new ErrorHandler("product Not found",404))
  }
  else{
    await Product.findByIdAndRemove(req.params.id)
  }


 res.status(200).json({
  sucess:true,
  message:"Product deleted succesfully"
 })

 logger.info("product deleted sucessfully !")
})


//show All Products

exports.showAllProducts = catchAsyncError(async (req, res, next) => {
    try {
      // enable search
      const keyword = req.query.keyword
        ? {
            name: {
              $regex: req.query.keyword,
              $options: 'i',
            },
          }
        : {};
  
      // enable filter by animal
      const animalId = req.query.animal;
      const animalFilter = animalId ? { animal: animalId } : {};
  
      // enable filter by treatment
      const treatmentId = req.query.treatment;
      const treatmentFilter = treatmentId ? { treatment: treatmentId } : {};
  
      //enable filter by essentials
      const essentialId = req.query.dailyEssential;
      const essentialFilter = essentialId ? {dailyEssential: essentialId}: {};

      //enable filter by medical care
      const medicalCareId = req.query.medicalCare;
      const medicalCareFilter =  medicalCareId ? {medicalCare: medicalCareId}:{};

      // enable pagination
      const pageSize = 4;
      const page = Number(req.query.pageNumber) || 1;
  
   // construct the filter based on the keyword and any additional filters
   const filter = {
    ...keyword,
    ...animalFilter,
    ...treatmentFilter,
    ...essentialFilter,
    ...medicalCareFilter,
  };
      const count = await Product.find(filter).countDocuments();
      const products = await Product.find(filter)
        .skip(pageSize * (page - 1))
        .limit(pageSize);
  
      res.status(200).json({
        success: true,
        count,
        products,
        page,
        pages: Math.ceil(count / pageSize),
      });
    } catch (error) {
      next(error);
      logger.error("show all products error")
    }
  });
  




//Create New review or Update the review
exports.createProductReview = catchAsyncError(async(req,res,next)=>{

  const {rating,comment,productId} = req.body;

  const review ={
      user:req.user._id,
      name:req.user.name,
      rating:Number(rating),
      comment,
  }

  const product =  await Product.findById(productId);

  const isReviewed = product.reviews.find(rev =>rev.user.toString() === req.user._id.toString());

  if(isReviewed){
      product.reviews.forEach(rev =>{
          if( rev.user.toString() === req.user._id.toString())
          rev.rating = rating;
          rev.comment = comment;
      })
  }
  else{
      product.reviews.push(review)
      product.numOfReviews = product.reviews.length
  }
 
  let avg = 0;
  product.ratings = product.reviews.forEach(rev=>{
      avg+=rev.rating;
  })
  
  product.ratings = avg/product.reviews.length;

  await product.save({validateBeforeSave:false})

  res.status(200).json({
      success:true,
      review
  })
  logger.info("review added or updated!")
})



//Get All Reviews of a Product

exports.getProductReviews = catchAsyncError(async(req,res,next)=>{
  const product = await Product.findById(req.query.id);

  if(!product){
      return next(new ErrorHandler("product not found",404));
  }

  res.status(200).json({
      success:true,
      reviews:product.reviews,
  })
  logger.info("get reviews of a single product !")
})


//Delete Review
exports.deleteReview = catchAsyncError(async (req,res,next)=>{
  const product = await Product.findById(req.query.productId);

  if(!product){
      return next(new ErrorHandler("Product not found",404));
  }

  const reviews = product.reviews.filter(
      rev => rev._id.toString() != req.query.id.toString())
   //          reviewID             userID
  let avg =0;

  reviews.forEach((rev)=>{
      avg += rev.rating;
  })

  const ratings = avg/ reviews.length;

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(req.query.productId,{
      reviews,
      ratings,
      numOfReviews,
  },{
      new:true,
      runValidators:true,
      useFindAndModify:false
  })

  res.status(200).json({
      success:true,
  })

  logger.info("Review deleted !")
})


//-----------------ADMIN---------------------


//get all products
exports.getAdminProducts = catchAsyncError(async (req,res,next) =>{

  const products = await Product.find()

  res.status(200).json({
      success:true,
      products,
  })

  logger.info("get all products admin !")
} )













