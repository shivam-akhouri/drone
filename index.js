var app = require("express")();
var express = require("express")
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var http = require("http").Server(app);
const port = process.env.PORT||5000;

const cors = require("cors");
app.use(cors())
var io = require("socket.io")(http, {
    cors: {
        origin: '*',
    }
}) 

app.get('/', (req, res)=>{
    res.send("Connection is established")
})

app.get("/up", (req, res)=>{
    io.sockets.emit("direction", {data:"e"})
    res.send({
        status: "e"
    })
})
app.get("/down", (req, res)=>{
    io.sockets.emit("direction", {data:"q"})
    res.send({
        status: "q"
    })
})
app.get("/forward", (req, res)=>{
    io.sockets.emit("direction", {data:"w"})
    res.send({
        status: "w"
    })
})
app.get("/backward", (req, res)=>{
    io.sockets.emit("direction", {data:"s"})
    res.send({
        status: "s"
    })
})
app.get("/left", (req, res)=>{
    io.sockets.emit("direction", {data:"a"})
    res.send({
        status: "a"
    })
})
app.get("/right", (req, res)=>{
    io.sockets.emit("direction", {data:"d"})
    res.send({
        status: "d"
    })
})
app.get("/arm",(req, res)=>{
    io.sockets.emit("direction", {data: "arm"})
    res.send({
        status: "arm"
    })
})
app.get("/disarm",(req, res)=>{
    io.sockets.emit("direction", {data: "disarm"})
    res.send({
        status: "disarm"
    })
})
app.get("/irrigate",(req, res)=>{
    io.socket.emit("direction", {data:"irrigate"})
    res.send({
        status:"irrigate"
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