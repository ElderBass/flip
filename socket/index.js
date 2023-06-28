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
            console.log('\n emitting socket event send_message: ', msg, '\n');
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
            console.log('\n destroying room: ', roomId, '\n');
            rooms = rooms.filter((room) => room.id !== roomId);
            ioServer.of(PATH).emit('returning_rooms', rooms);
        });

        socket.on('leave_room', ({ roomId, email }) => {
            console.log('\n emitting socket event: leave_room', roomId, '\n');
            const targetRoom = rooms.filter((room) => room.id === roomId)[0];
            const { members } = targetRoom;
            const updatedMembers = members.filter(
                (member) => member.email !== email
            );
            targetRoom.members = updatedMembers;
            rooms = rooms.map((room) => {
                if (room.id === roomId) {
                    return targetRoom;
                }
                return room;
            });
            socket.leave(roomId);
            ioServer.of(PATH).emit('returning_rooms', rooms);
        });

        socket.on('join_room', ({ roomId, user }) => {
            console.log('\n emitting socket event: join_room', roomId, '\n');
            console.log('\n current rooms: ', rooms, '\n');
            const targetRoom = rooms.filter((room) => room.id === roomId)[0];
            const { members } = targetRoom;
            const updatedMembers = [...members, user];
            targetRoom.members = updatedMembers;
            rooms = rooms.map((room) => {
                if (room.id === roomId) {
                    return targetRoom;
                }
                return room;
            });
            socket.join(roomId);
            ioServer.of(PATH).emit('returning_rooms', rooms);
        });

        socket.on('reconnect', (roomId) => {
            console.log('\n emitting socket event: reconnect', roomId, '\n');
            socket.join(roomId);
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
