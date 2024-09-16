const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the "public" directory
app.use(express.static('public'));

// When a client connects
io.on('connection', (socket) => {
    console.log('New user connected');

    // Listen for chat message
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg); // Broadcast message to everyone
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
