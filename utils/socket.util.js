const { Server } = require('socket.io');
const dotenv = require('dotenv');
const { CORS } = require('../constants/cors.constant')
dotenv.config();

const io = new Server({
    cors: {
        origin: CORS,
        credentials: true
    }
});

io.on("connection", (socket) => {
    console.log('Someone has connect')

    socket.on("disconnect", () => {
        console.log('Someone has left')
    })
})

io.listen(process.env.SOCKET_PORT)