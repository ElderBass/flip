export const hasJoinedRoom = (roomItem, email) => {
    if (Array.isArray(roomItem)) {
        let hasJoined = false;
        roomItem.forEach((room) => {
            if (room?.members?.filter((member) => member.email === email).length > 0) {
                hasJoined = true;
                return;
            }
        });
        return hasJoined;
    } else if (typeof roomItem === 'object') {
        return roomItem?.members?.filter((member) => member.email === email).length > 0;
    }
};
