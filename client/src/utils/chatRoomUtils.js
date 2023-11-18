export const hasJoinedRoom = (roomItem, email) => {
    let hasJoined = false;

    if (Array.isArray(roomItem)) {
        roomItem.forEach((room) => {
            if (room?.members?.filter((member) => member.email === email).length > 0) {
                hasJoined = true;
                return;
            }
        });
    } else if (typeof roomItem === 'object') {
        hasJoined = roomItem?.members?.filter((member) => member.email === email).length > 0;
    }
    return hasJoined;
};
