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
            const {
                user: { email },
            } = store.getState();
            if (rooms.length === 0) {
                store.dispatch(ChatActions.setOpenRoom({}));
            }

            rooms.forEach((room) => {
                if (
                    room.members &&
                    room.members.filter((member) => member.email === email).length > 0
                ) {
                    store.dispatch(ChatActions.setOpenRoom(room));
                }
            });
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

export const createRoom = async (roomName) => {
    if (!socket) {
        await initSocket();
    }
    const {
        user: { email, _id },
    } = store.getState();

    const initialMember = { email, _id };

    const newRoom = {
        id: `room-${uuidv4()}`,
        members: [initialMember],
        name: roomName,
    };
    store.dispatch(ChatActions.setOpenRoom(newRoom));
    socket.emit('create_room', newRoom);
};

export const joinRoom = (room) => {
    const {
        user: { email, _id },
    } = store.getState();

    const newMember = { email, _id };

    const updatedRoom = {
        ...room,
        members: [...room.members, newMember],
    };
    store.dispatch(ChatActions.setOpenRoom(updatedRoom));
    store.dispatch(ChatActions.setModal(null));
    socket.emit('join_room', { roomId: room.id, user: newMember });
};

export const leaveRoom = (room) => {
    const { id, members } = room;
    store.dispatch(ChatActions.setOpenRoom({}));
    store.dispatch(ChatActions.setMessages([]));
    store.dispatch(ChatActions.setModal(null));
    const {
        user: { email },
    } = store.getState();

    const newMembers = members.filter((user) => user.email !== email);

    if (!newMembers.length) {
        socket.emit('destroy_room', id);
        return;
    }
    const updatedRoom = { ...room, members: newMembers };
    store.dispatch(ChatActions.updateRoom(updatedRoom));
    socket.emit('leave_room', { roomId: id, email });
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
