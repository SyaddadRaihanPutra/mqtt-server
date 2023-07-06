const fs = require("fs");
const {ClientEsp} = require("./Client");

function IntoClientList(espId){
    console.log(espId);
    const isExist = ClientEsp.find((id) => id === espId);
    if(!isExist){
        ClientEsp.push(espId);
    }
}

function VerifyClient(espId){
    const isExist = ClientEsp.find((id) => id === espId);
    if(!isExist){
        return false;
    }
    return true;
}

function InsertESP(client, arr = []){
    client.on("message", async(topic, message) => {
        if(topic == "esp/init"){
            const data = JSON.parse(message.toString());
            const id = data.espId;
            console.log(id);
            IntoClientList(id);
        }
    });
} 

function InsertPersistESP(client, arr = []){
    client.on("message", async(topic, message) => {
        if(topic == "esp/init"){
            const data = JSON.parse(message.toString());
            const id = data.espId;
            IntoClientList(id);
        }
    });
    arr = JSON.stringify(arr);
    fs.writeFileSync("client.json", arr, "utf-8");
}

function GetClient(index = 0){
    return ClientEsp[index];
}

function CheckValidClient(req){
    let id = req.query.id;
    if(!id){
        return id = GetClient();
    }
    else{
        const isExist = VerifyClient(id);
        if(!isExist){
            return "ERROR";
        }
        console.log("Client exist");
        return;
    }
}

module.exports = {
    InsertESP,
    InsertPersistESP,
    GetClient,
    CheckValidClient
}