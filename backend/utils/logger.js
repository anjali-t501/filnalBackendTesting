const { createLogger, format, transports } = require("winston");


const logger = createLogger({
    format: format.printf((info)=>{
        return `${info.level.toUpperCase()} - ${info.message}`
    }),
    transports:[
        new transports.Console()
    ]
});


module.exports = logger;
