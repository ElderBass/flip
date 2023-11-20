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
    CHAT: '/chat',
    LANDING: '/landing',
};

export const MODALS = {
    CREATE: 'create',
    JOIN: 'join',
    LEAVE_ROOM: 'leave_room',
    STUDY: 'study',
    RESET: 'reset',
    END_ROOM: 'end',
    ROOM_ENDED: 'room_ended',
    NEW_HOST: 'new_host',
    LEAVE_CHAT: 'leave_chat',
};

export const chatActionModalTextMap = {
    leave_room: {
        header: 'Leave Room',
        main: 'Had enough chatter?',
        sub: 'You can always join again if you change your mind',
        button: 'Leave',
    },
    join: {
        header: 'Join Room',
        main: 'Feeling social?',
        sub: 'Join up to flip some cards while chatting with friends',
        button: 'Join',
    },
    end: {
        header: 'End Room',
        main: 'Need a break?',
        sub: 'This cannot be undone, but you can create another room any time',
        button: 'End Room',
    },
    leave_chat: {
        header: 'Leave Chat?',
        main: 'Whoa! Gotta jet?',
        sub: 'By leaving this page, you will also leave the active chat. That cool?',
        button: 'Leave',
    },
};

export const incrementIndexDelayMillis = 250;

export const SENDER_TYPE = {
    THIS_USER: 'thisUser',
    OTHER_USER: 'otherUser',
    SYSTEM: 'system'
};
