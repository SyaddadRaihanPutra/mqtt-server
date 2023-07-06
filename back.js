const app = require("express")();
const http = require("http");
const { client } = require("./mqclient");
const { InsertESP, InsertPersistESP } = require("./module/handleClient");

const server = http.createServer(app);
server.listen(5000, () => {
    console.log("Server running on Port 5000");
});

const clawRoutes = require("./controllers/claw");
const wheelRoutes = require("./controllers/wheel");
const ledRoutes = require("./controllers/led");

const {ClientEsp} = require("./module/Client");
InsertESP(client, ClientEsp);

app.use((req, res, cb) => {
    res.header("Content-Type", "application/json");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, ngrok-skip-browser"
    );
    cb();
});

app.use("/claw", clawRoutes);
app.use((req, res, cb) => {
    res.header("Content-Type", "application/json");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, ngrok-skip-browser"
    );
    cb();
});
app.use("/wheel", wheelRoutes);
app.use("/led", ledRoutes);

app.route("/list").get(async(req, res) => {
    console.log(ClientEsp);
    res.send(ClientEsp.join(", "));
});

app.get("/persist", async (req, res) => {
    InsertPersistESP(client, ESPid);
    res.status(200).send("Success");
});