const Order = require("../models/orderModel");
const Product  =  require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require('../middleware/catchAsyncError');
const sendEmail = require("../utils/sendEmail");
const logger =  require('../utils/logger');


// Create new Order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
    const {
      shippingInfo,
      orderItems,
      billingInfo,
    } = req.body;
  
    const order = await Order.create({
      shippingInfo,
      orderItems,
      billingInfo,
      orderedAt: Date.now(),
      user: req.user._id,
    });
  
    // Send email to user with order details
    const message = `
    <!DOCTYPE html>
    <html>
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <style type="text/css">
    
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; }
    
    img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    table { border-collapse: collapse !important; }
    body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; }
    
    
    a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
    }
    
    @media screen and (max-width: 480px) {
        .mobile-hide {
            display: none !important;
        }
        .mobile-center {
            text-align: center !important;
        }
    }
    div[style*="margin: 16px 0;"] { margin: 0 !important; }
    </style>
    <body style="margin: 0 !important; padding: 0 !important; background-color: #eeeeee;" bgcolor="#eeeeee">
    
    
    <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: Open Sans, Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
    For what reason would it be advisable for me to think about business content? That might be little bit risky to have crew member like them. 
    </div>
    
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
            <td align="center" style="background-color: green;" bgcolor="green">
            
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                <tr>
                    <td align="center" valign="top" style="font-size:0; padding: 35px;" bgcolor="green">
                   
                    <div style="display:inline-block; max-width:50%; min-width:100px; vertical-align:top; width:100%;">
                        <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:300px;">
                            <tr>
                                <td align="left" valign="top" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 36px; font-weight: 800; line-height: 48px;" class="mobile-center">
                                    <h1 style="font-size: 36px; font-weight: 800; margin: 0; color: #ffffff;"></h1>
                                </td>
                            </tr>
                        </table>
                    </div>
                    
                    <div style="display:inline-block; max-width:50%; min-width:100px; vertical-align:top; width:100%;" class="mobile-hide">
                        <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:300px;">
                            <tr>
                                <td align="right" valign="top" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; line-height: 48px;">
                                    <table cellspacing="0" cellpadding="0" border="0" align="right">
                                        <tr>
                                          
                                            <td style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 24px;">
                                           
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </div>
                  
                    </td>
                </tr>
                <tr>
                    <td align="center" style="padding: 35px 35px 20px 35px; background-color: #ffffff;" bgcolor="#ffffff">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                        <tr>
                            <td align="center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 25px;">
                               <br>
                                 <h3>OrderId : #${order._id}</h3>
                                <h2 style="font-size: 30px; font-weight: 800; line-height: 36px; color: #333333; margin: 0;">
                                    Thank You For Your Order!
                                </h2>
                            </td>
                        </tr>
                        <tr>
                            <td align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 10px;">
                                <p style="font-size: 16px; font-weight: 400; line-height: 24px; color: #777777;">
                                   Hi, ${order.billingInfo.fname}  ${order.billingInfo.lname}, We got your Order We will Contact you soon!
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td align="left" style="padding-top: 20px;">
                                <table cellspacing="0" cellpadding="0" border="0" width="100%">
                                    <tr>
                                        <td width="75%" align="left" bgcolor="#eeeeee" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px;">
                                           Product 
                                        </td>
                                        <td width="25%" align="left" bgcolor="#eeeeee" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px;">
                                            Quantity
                                        </td>
                                    </tr>
                                    ${order.orderItems.map(item => `
                                    <tr>
                                      <td width="75%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px; border-bottom: 3px solid #eeeeee;">
                                        ${item.name}
                                      </td>
                                      <td width="25%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px; border-bottom: 3px solid #eeeeee;">
                                        ${item.quantity}
                                      </td>
                                    </tr>
                                  `)}
                                  
                                  
                                </table>
                            </td>
                                </table>
                            </td>
                        </tr>
                    </table>
                    
                    </td>
                </tr>
                 <tr>
                    <td align="center" height="100%" valign="top" width="100%" style="padding: 0 35px 35px 35px; background-color: #ffffff;" bgcolor="#ffffff">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:660px;">
                        <tr>
                            <td align="center" valign="top" style="font-size:0;">
                                <div style="display:inline-block; max-width:50%; min-width:240px; vertical-align:top; width:100%;">
    
                                    <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:300px;">
                                        <tr>
                                            <td align="left" valign="top" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px;">
                                                <p style="font-weight: 800;">Delivery Address</p>
                                                <p>  ${order.shippingInfo.address}</p>
                                              <p>    ${order.shippingInfo.city},${order.shippingInfo.country},${order.shippingInfo.pinCode}
    </p>
                                              <p> Phone no: ${order.shippingInfo.phoneNo} </p>
    
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <div style="display:inline-block; max-width:50%; min-width:240px; vertical-align:top; width:100%;">
                                    <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:300px;">
                                     
                                    </table>
                                </div>
                            </td>
                        </tr>
                    </table>
                    </td>
                </tr>
                <tr>
                    <td align="center" style=" padding: 35px; background-color: green;" bgcolor="green">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                        <tr>
                            <td align="center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 25px;">
                                <h2 style="font-size: 24px; font-weight: 800; line-height: 30px; color: #ffffff; margin: 0;">
                                    VETMEDMAN 
                                </h2>
                            </td>
                        </tr>
                        <tr>
                          
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                    </td>
                </tr>
                <tr>
                   
                        </tr>
                        <tr>
                            <td align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 24px;">
                                <p style="font-size: 14px; font-weight: 400; line-height: 20px; color: #777777;">
                                    If you didn't create an account using this email address, please ignore this email. 
                                </p>
                            </td>
                        </tr>
                    </table>
                    </td>
                </tr>
            </table>
            </td>
        </tr>
    </table>
        
    </body>
    </html>
    
  
  `;
    try {
      await sendEmail({
        email: [req.user.email, 'anjalitejasvi501@gmail.com'],
        subject: 'Order confirmation VetmedMan',
        html:message,
        contentType: 'text/html',

      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  
    res.status(201).json({
      success: true,
      order,
    });

    logger.info("order placed !")
  });
  

//get Single Order
exports.getSingleOrder = catchAsyncErrors(async(req,res,next)=>{

    const order = await Order.findById(req.params.id).populate("user","name email");
  
    if(!order){
      return next(new ErrorHandler("Order not found with this id",404));
    }
  
    res.status(200).json({
      success:true,
      order,
    })
    logger.info("Order Detials!")
  })

//get logged in user Order
exports.myOrders = catchAsyncErrors(async(req,res,next)=>{

    const orders = await Order.find({user: req.user._id});
    //find order where orderSchema (user id)= userSchema (loggedin user id)
  
    res.status(200).json({
      success:true,
      orders,
    })
    logger.info("My orders!")
  })

  //get All orders --Admin
exports.getAllOrders = catchAsyncErrors(async(req,res,next)=>{

    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach((order)=>{
      totalAmount += order.totalPrice;
    })

    res.status(200).json({
      success:true,
      totalAmount,
      orders,
    })
    logger.info("Get all orders admin")
})


//Update Order status --Admin
exports.updateOrderStatus = catchAsyncErrors(async(req,res,next)=>{

    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new ErrorHandler("Order not found with this Id", 404));
    }

    if(order.orderStatus === "Delivered"){
      return next(new ErrorHandler("You have delivered this order",400))
    }
  
    order.orderItems.forEach(async(order)=>{
      await updateStock(order.product,order.quantity);
    });

    order.orderStatus = req.body.status;

    if(req.body.status === "Delivered"){
      order.deliveredAt=Date.now()
    }

    await order.save({validateBeforeSave:false})

    res.status(200).json({
      success:true,
   
    })
    logger.info("update order status admin")
})


async function updateStock(id,quantity){
  const product = await Product.findById(id);

  product.Stock -=quantity;
  await product.save({validateBeforeSave:false})

}

// delete Order -- Admin
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
  
    if (!order) {
      return next(new ErrorHandler("Order not found with this Id", 404));
    }else{
        await Order.findByIdAndRemove(req.params.id)
    }
  
    res.status(200).json({
      success: true,
    });
    logger.info("Delete orders admin")
  });
  