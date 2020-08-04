const express = require('express');
const socketio = require('socket.io'); // data transfer app, real time analytics
const http = require('http');

const PORT = process.env.PORT || 5000

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server); // rundown to  make this socket server working

io.on('connection', (socket) => { // io is a socket.io server instance  and socket argument is an object that represents an incoming socket connection from client
    console.log("we have a new connection")

    socket.on('disconnect', () => {
        console.log('User left')
    })
});

app.use(router);

server.listen(PORT, () => {
    console.log(`server has started on port ${PORT}`)
});