var gIo = null

async function socketConnect(http) {
    gIo = require("socket.io")(http, {
        cors: {
            origin: '*',
        }
    })
    gIo.on("connection", socket => {
        console.log('Socket is connected')

        socket.on("set-user-socket", userId => {
            console.log('User is just logged in => ', userId)
            socket.userId = userId
        })

        socket.on('unset-user-socket', () => {
            console.log('User is disconnected')
            delete socket.userId
        })
    })
}

async function emitToUser({ type, data, userId }) {
    const socket = await _getUserSocket(userId)
    if (socket) {
        socket.emit(type, data)
    } else {
        console.log('Cannot send event')
    }
}

async function _getUserSocket(userId) {
    const sockets = await _getAllSockets();
    const socket = sockets.find(s => s.userId === userId)
    return socket;
}

async function _getAllSockets() {
    // return all Socket instances
    const sockets = await gIo.fetchSockets();
    return sockets;
}

module.exports = {
    socketConnect,
    emitToUser
}