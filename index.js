const clc = require("cli-color");
const moment = require("moment")
const axios = require("axios")

const white = clc.white
const blue = clc.blue
const yellow = clc.yellow
const green = clc.green
const red = clc.red
const cyan = clc.cyan
const magenta = clc.magenta


let moduleOptions = {}
let logLevel = 2

module.exports = {
    configure,
    log,
    error,
    info,
    debug,
    start,
    update,
}

async function error(message) {
    if (moduleOptions.appId) {
        postLog("ERROR", message)
    }
    console.log(red("ERROR  ") + blue(moment().format("HH:mm")) + " ➤  " + white(message))
}

async function log(message) {
    if (moduleOptions.appId) {
        postLog("LOG", message)
    }
    if (logLevel >= 1) {
        console.log(yellow("LOG    ") + blue(moment().format("HH:mm")) + " ➤  " + white(message))
    }
}

async function debug(message) {
    if (moduleOptions.appId) {
        postLog("DEBUG", message)
    }
    if (logLevel >= 2) {
        console.log(white("DEBUG  ") + blue(moment().format("HH:mm")) + " ➤  " + white(message))
    }
}

async function info(message) {
    if (moduleOptions.appId) {
        postLog("INFO", message)
    }
    console.log(cyan("INFO   ") + blue(moment().format("HH:mm")) + " ➤  " + white(message))
}


async function update(message) {
    if (moduleOptions.appId) {
        postLog("UPDATE", message)
    }
    console.log(magenta("UPDATE ") + blue(moment().format("HH:mm")) + " ➤  " + white(message))
}

async function start(message) {
    if (moduleOptions.appId) {
        postLog("START", message)
    }
    console.log(green("START  ") + blue(moment().format("HH:mm")) + " ➤  " + white(message))
}


async function postLog(type, message) {
    try {
        axios.post(`${moduleOptions.postUrl}/post-log/${moduleOptions.appId}`, {
            type,
            message
        })
    } catch (error) {
        console.log(red("ERROR  ") + blue(moment().format("HH:mm")) + " ➤  " + white(error))
    }
}


function configure(options) {
    moduleOptions = options
    getLogLevel()
}

function getLogLevel() {
    switch (moduleOptions.logLevel) {
        case "ERROR":
            logLevel = 0
            break;
        case "LOG":
            logLevel = 1
            break;
        case "DEBUG":
            logLevel = 2
            break;


        default:
            break;
    }
}