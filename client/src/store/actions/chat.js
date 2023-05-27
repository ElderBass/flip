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

const RESET = 'RESET';

export {
    SET_ROOMS,
    setRooms,
    ADD_ROOM,
    addRoom,
    REMOVE_ROOM,
    removeRoom,
    SET_OPEN_ROOM,
    setOpenRoom,
    SET_MESSAGES,
    setMessages,
    ADD_MESSAGE,
    addMessage,
    RESET,
};
