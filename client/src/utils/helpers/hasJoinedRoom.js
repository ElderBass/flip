export const hasJoinedRoom = (roomItem, username) => {
    if (Array.isArray(roomItem)) {
        return (
            roomItem.filter((room) => room.host === username || room?.members?.includes(username)).length > 0
        );
    } else if (typeof roomItem === 'object') {
        return roomItem.host === username || roomItem?.members?.includes(username);
    }
};
