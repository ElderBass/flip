import { ending_study_deck } from "./ending_study_deck";
import { incrementing_study_deck } from "./incrementing_study_deck";
import { receive_message } from "./receive_message";
import { reset_complete } from "./reset_complete";
import { returning_rooms } from "./returning_rooms";
import { studying_deck } from "./studying_deck";
import { updated_room } from "./updated_room";

const socketEventListeners = {
    returning_rooms,
    updated_room,
    studying_deck,
    receive_message,
    ending_study_deck,
    incrementing_study_deck,
    reset_complete,
};

export const registerSocketListeners = (socket) => {
    for (const [event, handler] of Object.entries(socketEventListeners)) {
        socket.on(event, handler);
    }
};
