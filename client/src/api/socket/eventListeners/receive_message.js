import store from "../../../store";
import * as ChatActions from "../../../store/actions/chat";
import { SENDER_TYPE } from "../../../utils/constants";
import { trimEmail } from "../../../utils/helpers/emailHelpers";

export const receive_message = (message) => {
	const {
		user: { email },
		chat: { messages },
	} = store.getState();
	const { THIS_USER, OTHER_USER } = SENDER_TYPE;
	const senderType =
		trimEmail(email) === message.sender ? THIS_USER : OTHER_USER;
	const messageHistoryIds = messages.map((msg) => msg.id);
	if (!messageHistoryIds.includes(message.id)) {
		store.dispatch(
			ChatActions.addMessage({
				...message,
				senderType,
			})
		);
	}
};
