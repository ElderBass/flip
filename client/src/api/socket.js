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
    if (socket) {
        socket.emit('reconnect');
        return;
    }

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
            store.dispatch(ChatActions.setRooms(rooms));

            if (rooms.length > 0) {
                const {
                    user: { email },
                } = store.getState();

                const targetRoom = destroyedRoom
                    ? destroyedRoom
                    : rooms.filter((room) => room.id === roomId)[0];

                if (hasJoinedRoom(targetRoom, email)) {
                    if (destroyedRoom && destroyedRoom.host.email !== email) {
                        store.dispatch(
                            ChatActions.setModal({ type: MODALS.ROOM_ENDED, item: destroyedRoom })
                        );
                    } else if (!destroyedRoom) {
                        store.dispatch(ChatActions.setOpenRoom(targetRoom));
                    }
                }
            } else {
                // Just in case somehow openRoom isn't reset when rooms are
                store.dispatch(ChatActions.setOpenRoom({}));
            }
        });

        socket.on('updated_room', ({ updatedRoom, rooms, hasNewHost = false }) => {
            const {
                user: { email },
            } = store.getState();

            store.dispatch(ChatActions.setRooms(rooms));

            if (hasJoinedRoom(updatedRoom, email)) {
                if (hasNewHost) {
                    store.dispatch(
                        ChatActions.setModal({ type: MODALS.NEW_HOST, item: updatedRoom })
                    );
                    return;
                }
                store.dispatch(ChatActions.setOpenRoom(updatedRoom));
            }
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
    socket.emit('update_room', { updatedRoom, updateType: 'join' });
};

export const leaveRoom = (room) => {
    const { id, members, host } = room;
    const {
        user: { email },
    } = store.getState();

    const updatedMembers = members.filter((member) => member.email !== email);

    if (!updatedMembers.length) {
        destroyRoom(id);
        return;
    }

    const updatedRoom = { ...room, members: updatedMembers };

    let hasNewHost = false;

    if (email === host.email) {
        const updatedHostIndex = Math.floor(Math.random() * updatedMembers.length);
        updatedRoom.host = updatedRoom.members[updatedHostIndex];
        hasNewHost = true;
    }

    store.dispatch(ChatActions.reset());
    socket.emit('update_room', { updatedRoom, hasNewHost, updateType: 'leave' });
};

export const destroyRoom = (roomId) => {
    const {
        chat: {
            openRoom: { id },
        },
    } = store.getState();

    const actualId = roomId || id;

    store.dispatch(ChatActions.reset());
    socket.emit('destroy_room', actualId);
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
