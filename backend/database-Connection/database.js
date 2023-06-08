const mongoose = require('mongoose')
mongoose.set("strictQuery", false);
const logger =  require('../utils/logger')

const connectDatabase = ()=>{
    mongoose.connect(process.env.MONGO_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    }).then(()=>{
        logger.info("connected...");
    })
    //.catch(err=>console.log(err))
    
}

module.exports = connectDatabase;