import { io } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import store from '../store';
import * as ChatActions from '../store/actions/chat';
import * as DeckActions from '../store/actions/decks';
import * as ChatStudyDeckActions from '../store/actions/chatStudyDeck';
import { shuffleArray } from '../utils/helpers/shuffleArray';
import { hasJoinedRoom } from '../utils/chatRoomUtils';
import { incrementIndexDelayMillis, MODALS } from '../utils/constants';

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

        socket.on('returning_rooms', ({ rooms, roomId, destroyedRoom = null }) => {
            const {
                user: { email },
            } = store.getState();

            const targetRoom = destroyedRoom ? destroyedRoom : rooms.filter((room) => room.id === roomId)[0];

            if (hasJoinedRoom(targetRoom, email)) {
                if (destroyedRoom && destroyedRoom.host.email !== email) {
                    store.dispatch(ChatActions.setModal({ type: MODALS.ROOM_ENDED, room: destroyedRoom }));
                } else if (!destroyedRoom) {
                    store.dispatch(ChatActions.setOpenRoom(targetRoom));
                }
            }
            store.dispatch(ChatActions.setRooms(rooms));
        });

        socket.on('receive_message', (message) => {
            store.dispatch(ChatActions.addMessage(message));
        });

        socket.on('studying_deck', (deck) => {
            const {
                chatStudyDeck: { _id = null, reachedEndOfDeck },
            } = store.getState();

            if (!_id || reachedEndOfDeck) {
                store.dispatch(ChatStudyDeckActions.setStudyDeck(deck));
            }
        });

        socket.on('ending_study_deck', () => {
            store.dispatch(ChatStudyDeckActions.setReachedEndOfDeck(true));
        });

        socket.on('incrementing_study_deck', (deckIndex) => {
            const { chatStudyDeck } = store.getState();
            if (deckIndex !== chatStudyDeck.index) {
                store.dispatch(ChatStudyDeckActions.setFlipped(false));
                setTimeout(() => {
                    store.dispatch(ChatStudyDeckActions.setIndex(deckIndex));
                }, incrementIndexDelayMillis);
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
    store.dispatch(ChatActions.endChat());
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

export const destroyRoom = () => {
    const {
        chat: {
            openRoom: { id: roomId },
        },
    } = store.getState();

    store.dispatch(ChatActions.endChat());
    socket.emit('destroy_room', roomId);
};

export const studyDeck = () => {
    const {
        chat: { openRoom },
        decks: { selectedDeck },
    } = store.getState();

    store.dispatch(DeckActions.setSelectedDeck(null));

    const shuffledCards = shuffleArray(selectedDeck.cards);

    const studyDeck = {
        ...selectedDeck,
        flipped: false,
        index: 0,
        reachedEndOfDeck: false,
        cards: shuffledCards,
    };
    store.dispatch(ChatActions.setModal(null));
    store.dispatch(ChatStudyDeckActions.setStudyDeck(studyDeck));
    socket.emit('study_deck', { roomId: openRoom.id, studyDeck });
};

export const endStudyDeck = (roomId) => {
    socket.emit('end_study_deck', roomId);
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
