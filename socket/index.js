const { Server } = require('socket.io');

const PATH = '/socket/connect';
let ioServer = null;

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
        console.log('\n we in here ', socket.id, '\n');

        socket.on('send_message', (msg) => {
            console.log('\n socket sending message: ', msg, '\n');
            ioServer.emit('send_message', msg);
        });

        socket.on('create_room', (roomId) => {
           console.log('\n new room created: ', roomId, '\n');
           console.log('\n current rooms: ', socket.rooms, '\n');
           ioServer.emit('show_rooms', socket.rooms);
        });

        socket.on('join_room', (roomId) => {
            console.log('\n emitting socket event: join_room', roomId, '\n');
            console.log('\n current rooms: ', socket.rooms, '\n');
            socket.join(roomId);
        });

        socket.on('get_rooms', () => {
            const rooms = socket?.rooms || {};
            return rooms;
        });

        socket.on('reset', () => {
            ioServer.disconnectSockets();
            ioServer.close();
        });
    });
};

module.exports = {
    init,
};
