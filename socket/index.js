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
        ioServer.of(PATH).emit('returning_rooms', { rooms, roomId: null });

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
            ioServer.of(PATH).emit('returning_rooms', { rooms, roomId: id });
        });

        socket.on('destroy_room', (roomId) => {
            console.log('\n destroying room: ', roomId, '\n');
            const destroyedRoom = rooms.filter((room) => room.id === roomId)[0];
            rooms = rooms.filter((room) => room.id !== roomId);
            ioServer.of(PATH).to(roomId).emit('returning_rooms', { rooms, destroyedRoom, roomId });
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
            ioServer.of(PATH).emit('returning_rooms', { rooms, roomId });
        });

        socket.on('join_room', ({ roomId, user }) => {
            console.log('\n emitting socket event: join_room', roomId, '\n');
            console.log('\n current rooms: ', rooms, '\n');
            const targetRoom = rooms.filter((room) => room.id === roomId)[0];

            if (targetRoom) {
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
            }

            ioServer.of(PATH).emit('returning_rooms', { rooms, roomId });
        });

        socket.on('study_deck', ({ roomId, studyDeck }) => {
            console.log('\n emitting socket event: study_deck  [studyDeck:]', studyDeck, '\n');
            ioServer.of(PATH).to(roomId).emit('studying_deck', studyDeck);
        });

        socket.on('end_study_deck', (roomId) => {
            console.log('\n emitting socket event: end_study_deck  [roomId:]', roomId, '\n');
            ioServer.of(PATH).to(roomId).emit('ending_study_deck');
        });

        socket.on('increment_study_deck', ({ roomId, deckIndex }) => {
            console.log('\n emitting socket event: increment_study_deck ([roomId]:', roomId, ' )\n');
            ioServer.of(PATH).to(roomId).emit('incrementing_study_deck', deckIndex);
        })

        socket.on('reconnect', (roomId) => {
            console.log('\n emitting socket event: reconnect', roomId, '\n');
            socket.join(roomId);
        });

        socket.on('reset', () => {
            console.log('\n resetting rooms \n');
            rooms = [];
            ioServer.of(PATH).emit('reset_complete');
        });
    });
};

module.exports = {
    init,
};
