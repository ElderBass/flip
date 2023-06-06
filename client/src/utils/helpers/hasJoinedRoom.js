export const hasJoinedRoom = (roomItem, username) => {
    if (typeof roomItem === Array) {
        return (
            roomItem.filter((room) => room.host === username || room?.members?.includes(username)).length > 0
        );
    } else if (typeof roomItem === Object) {
        return roomItem.host === username || roomItem?.members?.includes(username);
    }
};
