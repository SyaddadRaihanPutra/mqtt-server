const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://localhost:1883");

client.on("connect", () => {
    console.log("Connected to broker");
    client.subscribe("esp/init", (err) => {
        try {
            console.log("Subscribed to Init");
        } catch (err) {
            console.log(err)
        }
    });
});

setTimeout(() => {
    client.publish("esp/init", '{"espId": "2555E3"}');
}, 2000);

module.exports = {client};