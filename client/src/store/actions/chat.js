const SET_ROOMS = 'SET_ROOMS';
const setRooms = (rooms) => ({
    type: SET_ROOMS,
    payload: rooms,
});

const ADD_ROOM = 'ADD_ROOOM';
const addRoom = (room) => ({
    type: ADD_ROOM,
    payload: room,
});

const UPDATE_ROOM = 'UPDATE_ROOM';
const updateRoom = (room) => ({
    type: UPDATE_ROOM,
    payload: room,
});

const REMOVE_ROOM = 'REMOVE_ROOM';
const removeRoom = (roomId) => ({
    type: REMOVE_ROOM,
    payload: roomId,
});

const SET_OPEN_ROOM = 'SET_OPEN_ROOM';
const setOpenRoom = (room) => ({
    type: SET_OPEN_ROOM,
    payload: room,
});

const SET_MESSAGES = 'SET_MESSAGES';
const setMessages = (messages) => ({
    type: SET_MESSAGES,
    payload: messages,
});

const ADD_MESSAGE = 'ADD_MESSAGE';
const addMessage = (message) => ({
    type: ADD_MESSAGE,
    payload: message,
});

const SET_MODAL = 'SET_MODAL';
const setModal = (payload) => ({
    type: SET_MODAL,
    payload,
});

const END_CHAT = 'END_CHAT';
const endChat = () => ({
    type: END_CHAT
});

const RESET = 'RESET_CHAT';
const reset = () => ({
    type: RESET,
});

export {
    SET_ROOMS,
    setRooms,
    ADD_ROOM,
    addRoom,
    UPDATE_ROOM,
    updateRoom,
    REMOVE_ROOM,
    removeRoom,
    SET_OPEN_ROOM,
    setOpenRoom,
    SET_MESSAGES,
    setMessages,
    ADD_MESSAGE,
    addMessage,
    SET_MODAL,
    setModal,
    END_CHAT,
    endChat,
    RESET,
    reset,
};
