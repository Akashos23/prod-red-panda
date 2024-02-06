import {Kafka} from "kafkajs"
import {getLocalBroker} from "../src/config/config.js";

const isLocalBroker = getLocalBroker()
const redpanda = new Kafka({
    brokers: [
        isLocalBroker ? `${process.env.HOST_IP}:19092` : 'redpanda-0:19092',
        'localhost:19092'],
});
export const connexion = async ()=>{
    const producer = redpanda.producer()
    await producer.connect()
    await producer.send({
        topic: "mon-super-topic",
        messages: [{value: JSON.stringify({"message" : "wow", "user" : "akash"})}],
    }
    )
    await producer.disconnect()
}