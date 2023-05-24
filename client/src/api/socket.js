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
        socket = io(PATH, options);
        socket.once('connect', resolve);
        console.log('\n CONNECTING TO SOCKET ?? \n\n');

        socket.open();
    });
};

export const sendMessage = () => {
    socket.emit('send_message', 'WE OUTTA HERE, BABY');
};


// function registerEventHandlers() {
//     const handlers = { ...switchboardEventHandlers, ...socketIoEventHandlers };
//     for (const [event, handler] of Object.entries(handlers)) {
//         socket.on(event, eventHandlerMiddleware(handler));
//     }
// }