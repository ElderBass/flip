import { io } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
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
            if (rooms.length === 0) {
                store.dispatch(ChatActions.setOpenRoom({}));
            }
            store.dispatch(ChatActions.setRooms(rooms));
        });
        socket.on('receive_message', (message) => {
            store.dispatch(ChatActions.addMessage(message));
        });

        socket.open();
    });
};

export const sendMessage = (message) => {
    const {
        user: { username },
        chat: { openRoom },
    } = store.getState();

    const messageObject = {
        text: message,
        id: `message-${uuidv4()}`,
        roomId: openRoom.id,
        sender: username,
    };
    socket.emit('send_message', messageObject);
};

export const createRoom = async () => {
    console.log('\n are we creating a room ? \n');
    if (!socket) {
        await initSocket();
    }
    const {
        user: { username },
    } = store.getState();

    const newRoom = {
        id: `room-${uuidv4()}`,
        host: username,
        members: [],
    };
    store.dispatch(ChatActions.setOpenRoom(newRoom));
    socket.emit('create_room', newRoom);
};

export const joinRoom = (room) => {
    const {
        user: { username },
    } = store.getState();

    const updatedRoom = {
        ...room,
        members: [...room.members, username],
    };
    store.dispatch(ChatActions.setOpenRoom(updatedRoom));
    socket.emit('join_room', { roomId: room.id, socketId: socket.id });
};

export const reconnect = async (roomId) => {
    await initSocket();
    socket.emit('reconnect', roomId);
};

export const disconnectSocket = () => socket.disconnect();

export const resetServer = () => {
    store.dispatch(ChatActions.setMessages([]));
    store.dispatch(ChatActions.setOpenRoom({}));
    store.dispatch(ChatActions.setRooms([]));
    socket.emit('reset');
};
