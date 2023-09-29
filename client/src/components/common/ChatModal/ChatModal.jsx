import React from 'react';
import { MODALS } from '../../../utils/constants';
import RoomAction from './RoomAction';
import CreateChatRoomForm from './CreateChatRoomForm';
import ConfirmDeck from './ConfirmDeck';
import ResetChat from './ResetChat';
import RoomEnded from './RoomEnded';
import NewHost from './NewHost';

const ChatModal = ({ type, item }) => {
    const ChatModalMap = {
        [MODALS.CREATE]: CreateChatRoomForm,
        [MODALS.JOIN]: RoomAction,
        [MODALS.LEAVE]: RoomAction,
        [MODALS.END_ROOM]: RoomAction,
        [MODALS.STUDY]: ConfirmDeck,
        [MODALS.RESET]: ResetChat,
        [MODALS.ROOM_ENDED]: RoomEnded,
        [MODALS.NEW_HOST]: NewHost,
    };

    const ModalComponent = ChatModalMap[type];

    return <ModalComponent type={type} item={item} />;
};

export default ChatModal;
