export const isInRoomsList = (roomId, roomArr) => {
    console.log('\n roomId - ', roomId, '\n\n');
    console.log('\n roomArr = ', roomArr, '\n\n');
    if (!roomArr.length) return false;

    return roomArr.filter((room) => room.id === roomId).length;
};
