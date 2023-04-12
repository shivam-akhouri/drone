var app = require("express")();
var express = require("express")
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var http = require("http").Server(app);
const port = process.env.PORT||5000;

const cors = require("cors");
app.use(cors())
var io = require("socket.io")(http) 

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