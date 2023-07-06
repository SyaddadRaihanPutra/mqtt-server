const aedes = require("aedes")();
const net = require("net");

const server = net.createServer(aedes.handle);
server.listen(1883);

console.log("MQTT Server is running!")

/* If you want to implement Authentication system 
aedes.authenticate = (client, username, password, callback) =>{
    callback(null, authorized);
}
*/

aedes.on('client', (client) => {
    console.log('new client connected', client.id);
});


aedes.on('publish', (packet, client) => {
    if(client){
        console.log('Message from client', client.id, " with message ", packet);
    }
});


aedes.on('subscribe', (subs, clients) => {
    if(clients){
        console.log('Client ', clients.id, " subscribed to topics ", subs);
    }
});

aedes.on("unsubscribe", (subs, client) => {
    if(client){
        console.log("Client ", client.id, " unsubscribe from topics ", subs);
    }
});