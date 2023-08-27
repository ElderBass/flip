import { io } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import store from '../store';
import * as ChatActions from '../store/actions/chat';
import * as DeckActions from '../store/actions/decks';
import { shuffleArray } from '../utils/helpers/shuffleArray';

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

        socket.on('studying_deck', (deck) => {
            const {
                chat: { openRoom },
            } = store.getState();

            if (!openRoom.activeDeck) {
                const updatedRoom = {
                    ...openRoom,
                    activeDeck: deck,
                };
                store.dispatch(ChatActions.setOpenRoom(updatedRoom));
            }
        });

        socket.on('incrementing_study_deck', (deckIndex) => {
            console.log('\n incrementing_study_deck SOCKET deck index =', deckIndex, '\n\n');
            const {
                chat: { openRoom },
            } = store.getState();
            console.log('\n openRoom - ', openRoom, '\n\n');
            if (deckIndex !== openRoom.activeDeck.index) {
                console.log('\n are we about to update study deck index ???? \n\n');
                store.dispatch(ChatActions.setStudyDeckIndex(deckIndex));
            }
        });

        socket.on('reset_complete', () => {
            store.dispatch(ChatActions.reset());
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

    const host = { email, _id };

    const newRoom = {
        id: `room-${uuidv4()}`,
        members: [host],
        name: roomName,
        host,
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

// TODO: Refactor to choose a new host when the host leaves
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

export const studyDeck = () => {
    const {
        decks: { selectedDeck },
        chat: { openRoom },
    } = store.getState();

    store.dispatch(DeckActions.setSelectedDeck(null));

    // SOME FUCKING HOW this is causing a state invariant error
    const shuffledCards = shuffleArray(selectedDeck.cards);

    const updatedRoom = {
        ...openRoom,
        activeDeck: {
            ...selectedDeck,
            cards: shuffledCards,
        },
    };
    store.dispatch(ChatActions.setOpenRoom(updatedRoom));
    store.dispatch(ChatActions.setModal(null));
    socket.emit('study_deck', updatedRoom);
};

export const incrementStudyDeck = (roomId, index) => {
    socket.emit('increment_study_deck', { roomId, deckIndex: index });
};

export const reconnect = async (roomId) => {
    await initSocket();
    socket.emit('reconnect', roomId);
};

export const disconnectSocket = () => socket.disconnect();

export const resetServer = () => {
    socket.emit('reset');
};
