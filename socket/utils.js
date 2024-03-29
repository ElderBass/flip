const updateRoomsList = (roomsList, updatedRoom) => {
    return roomsList.map((room) => {
        if (room.id === updatedRoom.id) {
            return updatedRoom;
        }
        return room;
    });
};

module.exports = {
    updateRoomsList
};
