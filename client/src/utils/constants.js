import ChatConfirmDeckModal from '../components/common/ChatConfirmDeckModal';
import ChatJoinLeaveModal from '../components/common/ChatJoinLeaveModal';
import CreateRoomForm from '../components/common/CreateRoomForm/CreateRoomForm';
import ResetChatModal from '../components/common/ResetChatModal';

export const ERROR_MESSAGE = {
    LOGIN: {
        404: "Huh, couldn't find any user with that email",
        GENERIC: 'Something went wrong logging you in. Please try again',
        WRONG_PASSWORD: 'Ooof. Wrong password there, bud.',
    },
    SIGNUP: {
        INVALID_EMAIL: "Oops! That email doesn't look right",
        PASSWORD_MISMATCH: "Yikes! Your passwords don't match!",
    },
    CREATE_CARD: {
        INCOMPLETE: "You haven't finished filling out the card!",
        DUPLICATE: "You've already added this card!",
    },
    FINISH_CARD: {
        DOUBLE_CHECK: "Don't forget to double check your cards!",
        NO_NAME: 'This deck needs a name, bro!',
        GENERIC: 'Something went wrong when finishing your deck, sorry!',
    },
};

export const SIDES = {
    FRONT: 'Front',
    BACK: 'Back',
};

export const LOCAL_STORAGE_KEYS = {
    LOGGED_IN: 'userLoggedIn',
};

export const PAGES = {
    ROOT: '/',
    HOME: '/home',
    BROWSE: '/browse',
    DECK: '/deck',
    CREATE_DECK: '/create-deck',
    EDIT_DECK: '/edit-deck',
    LOGOUT: '/logout',
    STATS: '/stats',
    STUDY: '/study',
};

export const ChatModalMap = {
    Create: CreateRoomForm,
    Join: ChatJoinLeaveModal,
    Leave: ChatJoinLeaveModal,
    Study: ChatConfirmDeckModal,
    Reset: ResetChatModal,
};
