const logger = require("./index")

logger.configure({
    logLevel: "DEBUG",
    appID: "App ID",
    postUrl: "ServerURL"
})

logger.log("log")
logger.error("error")
logger.info("info")
logger.start("start")
logger.debug("debug")
logger.update("update")