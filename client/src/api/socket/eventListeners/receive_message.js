import store from '../../../store';
import * as ChatActions from '../../../store/actions/chat';
import { SENDER_TYPE } from '../../../utils/constants';

export const receive_message = (message) => {
    store.dispatch(ChatActions.addMessage({
        ...message,
        senderType: SENDER_TYPE.OTHER_USER
    }));
};
