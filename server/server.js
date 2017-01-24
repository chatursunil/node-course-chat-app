const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const express = require('express');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', {
        from: 'dumdum@hotmail.com',
        text: 'What\'s going on?',
        createdAt: new Date().toString()
    });

    socket.on('createMessage', (message) => {
        console.log('New message from client', message);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected from the server');
    });
});

app.use(express.static(publicPath));

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
})