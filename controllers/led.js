const router = require("express").Router();
const { client } = require("../mqclient");
const fs = require("fs")
const {ClientEsp} = require("../module/Client");

router.get("/load", async (req, res) => {
    const data = JSON.parse(fs.readFileSync(require.resolve("../client.json"), "utf-8"));
    data.forEach(data => {
        ClientEsp.push(data.id);
    });
    if (!ClientEsp && data){
        res.status(500).send("Internal Server Error");
    }
    else{
        res.status(200).send("Success");
    }
});

router.get("/on", async (req, res) => {
    const id = req.query.id;
    if (!id) res.status(400).send("Must give ESP id");
    else {
        client.publish(`esp/${id}/response`, "1");
        res.status(200).send("Success");
    }
});

router.get("/off", async (req, res) => {
    const id = req.query.id;
    if (!id) res.status(400).send("Must give ESP id");
    else {
        client.publish(`esp/${id}/response`, "0");
        res.status(200).send("Success");
    }
});

module.exports = router