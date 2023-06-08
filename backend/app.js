const express = require('express');
const app = express();
const errorMiddleware = require('./middleware/error')
const cookieParser = require('cookie-parser')
const dotenv =  require('dotenv');
const cors = require('cors')

// Config 
dotenv.config({path:"backend/config/config.env"});

app.use(cors());

app.use(cookieParser())
app.use(express.json())





//Route Imports
const user = require("./routes/userRoutes")
const animalType = require('./routes/categories/animalTypeRoutes')
const treatmentType = require('./routes/categories/treatmentTypeRoute')
const product =  require('./routes/productsRoute')
const essential = require('./routes/categories/dailyEssentialRoutes');
const medical = require('./routes/categories/medicalCareRoute');
const order = require('./routes/orderRoutes')
const varieties = require("./routes/varietyRoutes");

app.use("/api/v1",user);
app.use("/api/v1",animalType);
app.use("/api/v1",treatmentType);
app.use("/api/v1",product);
app.use("/api/v1",essential);
app.use("/api/v1",medical);
app.use("/api/v1",order);
app.use("/api/v1", varieties);


app.use("*", (req,res)=>{
    res.status(404).json({
        success:false,
        errors:[
            {
                msg:"Route Not found",
            },
        ]
    })
})

//Middleware for error
app.use(errorMiddleware)



module.exports =  app;