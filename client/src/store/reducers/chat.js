import * as ChatActions from '../actions/chat';

const INITIAL_STATE = {
    rooms: [],
    openRoom: {},
    messages: [],
    actionModal: null,
};

const chat = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case ChatActions.SET_ROOMS:
            return { ...state, rooms: payload };
        case ChatActions.ADD_ROOM:
            return { ...state, rooms: [...state.rooms, payload] };
        case ChatActions.UPDATE_ROOM:
            const newRooms = state.rooms.map((room) => {
                if (room.id === payload.id) {
                    return payload;
                }
                return room;
            });
            return { ...state, rooms: newRooms };
        case ChatActions.REMOVE_ROOM:
            const updatedRooms = state.rooms.filter((room) => room.id !== payload);
            return { ...state, rooms: updatedRooms };
        case ChatActions.SET_OPEN_ROOM:
            return { ...state, openRoom: payload };
        case ChatActions.SET_MESSAGES:
            return { ...state, messages: payload };
        case ChatActions.ADD_MESSAGE:
            return { ...state, messages: [...state.messages, payload] };
        case ChatActions.SET_MODAL:
            return { ...state, actionModal: payload };
        case ChatActions.SET_STUDY_DECK_INDEX:
            const updatedRoom = {
                ...state.openRoom,
                activeDeck: {
                    ...state.openRoom.activeDeck,
                    index: payload
                }
            }
            return { ...state, openRoom: updatedRoom };
        case ChatActions.RESET:
            return INITIAL_STATE;
        default:
            return state;
    }
};

export default chat;
