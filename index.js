var app = require("express")();
var express = require("express")
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var http = require("http").Server(app, path="/socket.io")
const port = process.env.port || PORT;

const cors = require("cors");
app.use(cors())
var io = require("socket.io")(http, {
    cors: {
        origin: "<http://localhost:3000>"
    }
}) 

app.get('/', (req, res)=>{
    res.send("Connection is established")
})

app.get("/up", (req, res)=>{
    io.sockets.emit("up", {data:"up"})
    res.send({
        status: "done"
    })
})

io.on("connection", (socket)=>{
    console.log("A user connected")
    socket.on('disconnect', ()=>{
        console.log("A user disconnected")
    })
})

http.listen(port, ()=>{
    console.log("[LOG]:Server ready on port 3000")
})