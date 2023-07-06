const router = require("express").Router();
const {client, returnClientList} = require("../mqclient");

let currentClient;

router.route("/initialize").get(async(req,res) => {
    currentClient = returnClientList(currentClient);
    res.json(currentClient).status(200);
});

router.route("/open").get(async(req, res) => {
    client.publish("/esp/commands", "10000");
    res.status(200).send("Success");
});

router.route("/close").get(async(req, res) => {
    client.publish("esp/commands", "10500");
    res.status(200).send("Success");
})

module.exports = router;