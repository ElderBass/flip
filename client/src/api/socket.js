import { io } from 'socket.io-client';
import store from '../store';
import * as ChatActions from '../store/actions/chat';

const PATH = '/socket/connect';
let socket = null;

export const initSocket = () => {
    if (socket) return;

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

        socket.once('connect', resolve);

        socket.on('returning_rooms', (rooms) => {
            store.dispatch(ChatActions.setRooms(rooms));
        });
        socket.on('receive_message', (message) => {
            store.dispatch(ChatActions.addMessage(message));
        });

        socket.open();
    });
};

export const sendMessage = (message) => {
    socket.emit('send_message', message);
};

export const createRoom = async (room) => {
    if (!socket) {
        await initSocket();
    }
    socket.emit('create_room', room);
    store.dispatch(ChatActions.setOpenRoom(room));
};

export const joinRoom = (room) => {
    socket.emit('join_room', room.id);
    store.dispatch(ChatActions.setOpenRoom(room));
};
// TODO: Should not need - have BE socket emit all rooms once user connects to it
export const getRooms = async () => {
    if (!socket) {
        await initSocket();
    }
    socket.emit('get_rooms');
}

export const resetServer = () => {
    store.dispatch(ChatActions.setMessages([]));
    store.dispatch(ChatActions.setOpenRoom({}));
    store.dispatch(ChatActions.setRooms([]));
    socket.emit('reset');
};

// function registerEventHandlers() {
//     const handlers = { ...switchboardEventHandlers, ...socketIoEventHandlers };
//     for (const [event, handler] of Object.entries(handlers)) {
//         socket.on(event, eventHandlerMiddleware(handler));
//     }
// }