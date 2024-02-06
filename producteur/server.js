import * as Admin from "../src/redpanda/admin.js"
import * as Producer from "./producers.js"
import * as Consommeur from './Consommeur.js'
import {getUser} from "../src/messages/userlist.js";
import {getStringMessage} from "../src/messages/stringmessages.js";
import {getNumberMessage} from "../src/messages/numbermessage.js";
import {getConfigNumber, getDebug, getNumberWord, getTimeOut, getTopic, getTypeMessage} from "../src/config/config.js";

const configNumber = getConfigNumber()
const typeMessage = getTypeMessage()
const topic = getTopic()
const numberWorld = getNumberWord()
const debug = getDebug()

async function start() {

    console.log("Connecting...")

    Consommeur.consommeur();
}

start()