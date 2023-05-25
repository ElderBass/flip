import { io } from 'socket.io-client';

const PATH = '/socket/connect';
let socket = null;

export const initSocket = () => {
    const options = {
        autoConnect: false,
        path: PATH,
        reconnectionAttempts: 30,
        rememberUpgrade: true,
        multiplex: false,
        timeout: 20000,
        transports: ['polling'],
    };
    return new Promise((resolve) => {
        socket = io(`http://localhost:8000${PATH}`, options);
        const onConnect = () => {
            console.log('\n connected to socket', socket, '\n\n');
            resolve();
        };
        socket.once('connect', onConnect);

        socket.open();
    });

};

export const sendMessage = (msg) => {
    socket.emit('send_message', msg);
};

export const createRoom = async (roomId) => {
    if (!socket) {
        await initSocket();
    }
    socket.emit('create_room', roomId);
};

export const joinRoom = (roomId) => {
    socket.emit('join_room', roomId);
};

export const resetServer = () => {
    socket.emit('reset');
};

// function registerEventHandlers() {
//     const handlers = { ...switchboardEventHandlers, ...socketIoEventHandlers };
//     for (const [event, handler] of Object.entries(handlers)) {
//         socket.on(event, eventHandlerMiddleware(handler));
//     }
// }