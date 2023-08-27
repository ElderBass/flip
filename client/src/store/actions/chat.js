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

const SET_STUDY_DECK_INDEX = 'SET_STUDY_DECK_INDEX';
const setStudyDeckIndex = (index) => ({
    type: SET_STUDY_DECK_INDEX,
    payload: index
})

const SET_MODAL = 'SET_MODAL';
const setModal = (payload) => ({
    type: SET_MODAL,
    payload,
});

const RESET = 'RESET';
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
    SET_STUDY_DECK_INDEX,
    setStudyDeckIndex,
    RESET,
    reset,
};
