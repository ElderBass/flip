import * as ChatActions from '../actions/chat';

const INITIAL_STATE = {
    rooms: [],
    openRoom: {},
    messages: [],
    actionModal: null,
    usersTyping: [],
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
        case ChatActions.ADD_USER_TYPING:
            const isAlreadyTyping =
                state.usersTyping.filter((user) => user === payload).length === 1;
            if (isAlreadyTyping) return state;

            return { ...state, usersTyping: [...state.usersTyping, payload] };
        case ChatActions.REMOVE_USER_TYPING:
            const updatedUsers = state.usersTyping.filter(
                (user) => user !== payload
            );
            return { ...state, usersTyping: updatedUsers };
        case ChatActions.RESET:
            return INITIAL_STATE;
        default:
            return state;
    }
};

export default chat;
