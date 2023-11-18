import { disconnectSocket, leaveRoom } from '../api/socket';

export const navigateFromChat = (navigate, room) => {
    leaveRoom(room);
    disconnectSocket();
    navigate();
};
