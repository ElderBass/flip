import * as ChatActions from '../actions/chat';

const INITIAL_STATE = {
    rooms: [],
    openRoom: {},
    messages: [],
};

const chat = (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case ChatActions.SET_ROOMS:
            return { ...state, rooms: payload };
        case ChatActions.ADD_ROOM:
            return { ...state, rooms: [...state.rooms, payload] };
        case ChatActions.REMOVE_ROOM:
            const updatedRooms = state.rooms.filter((room) => room.id !== payload);
            return { ...state, rooms: updatedRooms };
        case ChatActions.SET_OPEN_ROOM:
            return { ...state, openRoom: payload };
        case ChatActions.SET_MESSAGES:
            return { ...state, messages: payload };
        case ChatActions.ADD_MESSAGE:
            return { ...state, messages: [...state.messages, payload] };
        case ChatActions.RESET:
            return INITIAL_STATE;
        default:
            return state;
    }
};

export default chat;
