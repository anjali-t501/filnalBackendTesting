const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const ProductSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter Product name"]
    },
    description:{
        type:String
    },
    ratings:{
        type:Number,
        default:0
    },
    brand:{
        type:String
    },
    size_of_instrument:{
        type: [String],
        default: []
    },
    stage:{
        type:String,
        default:"all stage"
    },
    condition:{
        type:String,
    },
    varieties: 
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "varieties",
        },
    specific_feature:{
        type:String,
    },
    packaging_dimensions:{
        type:String,
    },
    mode_of_administration: {
        type: String,
    },
    caution:{
        type:String,
    },
    material_used:{
        type: String,
        required:true
    },
    Stock:{
        type:Number,
        default:1
    },
    color:[
        {
            type:String,
        }
    ],
    model_number:{
        type:String
    },
    dimension_of_the_product:{
        type:String,
    },
    weight_of_the_commodity:{
        type:String
    },
    MOQ:{
        type:String
    },
    active_ingredients:{
        type:String
    },
    country_of_manufacture:{
        type:String
    },
    lead_time_to_deliver:{
        type:String
    },
    fda_or_certified:{
        type:String
    },
    total_primary_packet:{
        type:String
    },
    primary_packing_Single_hand:{
        type:String
    },
    prior_prophylactic_preparation :{
        type:String
    },
    shelflife:{
        type:String,
    },
    lab_instruments:{
        type:String
    },
    guarantee:{
        type:String
    },
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    dosage_recommended:{
        type:String
    },
    fast_moving_spare_parts:{
        type:String
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            user:{
                type:ObjectId,
                ref:"User",
                required:true
            },
            name:{
                type:String,
                required:true,
            },
            rating:{
                type:Number,
            },
            comment:{
                type:String,
            }

        }
    ],
    user:{
        type:ObjectId,
        ref:"User",
        required:true
    },
    animal:[{
        type:ObjectId,
        ref:"Animal",
        required:true
    }],
    treatment:[{
        type:ObjectId,
        ref:"Treatment",
        required:false

    }],
    dailyEssential:[{
        type:ObjectId,
        ref:"Essential",
        required:false

    }],
    medicalCare:[{
        type:ObjectId,
        ref:"Medical",
        required:false

    }],
    faqs: [
        {
           question:{
            type:String,
           },
           answer:{
            type:String
           }
        },
      ],
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model("Product", ProductSchema);
