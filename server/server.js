const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const express = require('express');

const {generateMessage} = require('./utils/message');
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the sexroom'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'Hey everyone, Andrew just joined the room to get plowed'));

    socket.on('createMessage', (message, callback) => {
        console.log('New message from client', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('This is from the server');
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected from the server');
    });
});

app.use(express.static(publicPath));

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
})