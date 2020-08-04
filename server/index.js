const express = require('express');
const socketio = require('socket.io'); // data transfer app, real time analytics
const http = require('http');

const PORT = process.env.PORT || 5000

const app = express();
const server = http.createServer(app);
const io = socketio(server); // rundown to  make this socket server working

server.listen(PORT, () => {
    console.log(`server has started on port ${PORT}`)
});