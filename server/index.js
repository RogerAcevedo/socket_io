// create express server
const express = require('express');
const app = express();
const http = require('http');
const {Server} = require('socket.io');
// import cors
const cors = require('cors');

// accept cors using middleware
app.use(cors());

//create HTTP server with express
const server = http.createServer(app);

// variable to managme socket.io
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ["GET", "POST"],
    },
});

// LISTEN TO EVENTS WITH IO io.on('connection')
io.on('connection', (socket) => {
    console.log(`User is Online: ${socket.id}`);

    // JOIN EVENT TO TALK TO SPECIFIC PEOPLE
    socket.on('join_room', (data) => {
        socket.join(data);
    });

    socket.on('send_message', (data) => {
        // console.log(data);
        // * MESSAGES TO EVERYONE
        // socket.broadcast.emit('recieve_message', data)
        // * MESSAGES TO ROOMS
        socket.to(data.room).emit('recieve_message', data)
    });
});

server.listen(3001, () => {
    console.log('SERVER IS RUNNING')
})