import store from '../store';
import * as ChatActions from '../store/actions/chat';
import { MODALS } from './constants';

export const unloadChat = () => {
    const { openRoom } = store.getState().chat;

    if (openRoom && openRoom.id) {
        const toUrl = window.location.pathname;

        store.dispatch(
            ChatActions.setModal({
                type: MODALS.LEAVE_CHAT,
                item: {
                    ...openRoom,
                    toUrl,
                },
            })
        );
    }
};
