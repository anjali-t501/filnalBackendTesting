const app = require('./app');
const dotenv =  require('dotenv');
const connectDatabase = require("./database-Connection/database")
const logger =  require('./utils/logger')

//Handling Uncaught Exception
process.on("uncaughtException",(err)=>{
    logger.error(`Error: ${err.message}`);
    logger.info("Shutting down the server due to uncaught Exception ");
    process.exit(1);
})

// Config 
dotenv.config({path:"backend/config/config.env"});


//connecting database
connectDatabase();



const port =  process.env.PORT;

const server = app.listen(port,()=>{
    logger.info(`server is running on http://localhost:${port}`)
})


//unhandled promise rejection -> if mongodb url is wrong
//we want server to be crashed
process.on("unhandledRejection",err=>{
    logger.error(`Error: ${err.message}`);
    logger.error(`Shutting down the server due to unhandled Promise rejection`);

    server.close(()=>{
        process.exit(1);
    })
})
