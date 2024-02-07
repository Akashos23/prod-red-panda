import {Kafka, logLevel} from "kafkajs";
import {getLocalBroker} from "../src/config/config.js";
import { createClient } from 'redis';

const isLocalBroker = getLocalBroker()
const redpanda = new Kafka({
    brokers: [
        isLocalBroker ? `${process.env.HOST_IP}:19092` : 'redpanda-0:19092',
        'localhost:19092'],
});
const client = await createClient({
    host: "myredis",
    port: 6379,
    password : "redispwd"
})
    .on('error', err => console.log('Redis Client Error', err))
    .connect();

export const consommeur = async ()=> {
    const consumer = redpanda.consumer({groupId: 'test-group'})

    await consumer.connect()
    await consumer.subscribe({topic: 'mon-super-topic'})
    await consumer.run({
        eachMessage: async ({topic, partition, message}) => {
            console.log(getDate(message.timestamp) + `${message.value}`)
            const mes = JSON.parse(message.value.toString());
            mes.message.toString().split(" ").map((mot) =>client.incr(mot));
        },
    })

}

const getDate = (date)=>{
    let foo = Number.parseInt(date);
    var date = new Date(foo);
    return date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear() + " à " + date.getHours() + " :" + date.getMinutes()
}



