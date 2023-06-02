const { Server } = require('socket.io');

const PATH = '/socket/connect';
let ioServer = null;

let rooms = [];

const init = (server) => {
    const options = {
        path: PATH,
        pingTimeout: 20000,
        pingInterval: 25000,
        upgradeTimeout: 20000,
        transports: ['polling'],
        cors: {
            origin: 'http://localhost:3000',
        },
        handlePreflightRequest(req, res) {
            res.writeHead(200, {
                'Access-Control-Allow-Origin': true,
                'Access-Control-Allow-Methods': 'POST, GET',
                'Access-Control-Allow-Credentials': true,
            });
            res.end();
        },
    };

    ioServer = new Server(server, options);

    ioServer.of(PATH).on('connection', (socket) => {

        ioServer.of(PATH).emit('returning_rooms', rooms);

        socket.on('send_message', (msg) => {
            console.log('\n socket sending message: ', msg, '\n');
            ioServer.of(PATH).to(msg.roomId).emit('receive_message', msg);
        });

        socket.on('create_room', (room) => {
            const { id } = room;
            console.log('\n new room created: ', id, '\n');
            rooms.push(room);
            console.log('\n current rooms: ', rooms, '\n');
            socket.join(id);
            ioServer.of(PATH).emit('returning_rooms', rooms);
        });

        socket.on('destroy_room', (roomId) => {
            console.log('\n destroying room: ', id, '\n');
            rooms = rooms.filter(room => room.id !== roomId);
        });

        socket.on('join_room', ({ roomId, socketId }) => {
            if (!io.sockets.adapter.rooms[roomId]?.sockets[socketId]) {
                console.log('\n emitting socket event: join_room', roomId, '\n');
                console.log('\n current rooms: ', rooms, '\n');
                socket.join(roomId);
            } else {
                console.log(`\n socket ${socketId} is already in room ${roomId}`);
            }
        });

        socket.on('reset', () => {
            console.log('\n resetting rooms \n');
            rooms = [];
        });
    });
};

module.exports = {
    init,
};
