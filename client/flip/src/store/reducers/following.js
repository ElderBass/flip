import { getOneUser } from '../../api';
import * as UserActions from '../actions/user';

const INITIAL_STATE = [];

const getFollowing = async (userIds) => {
    const users = [];
    if (userIds.length) {
        await userIds.forEach(async (id) => {
            const user = await getOneUser(id);
            users.push(user);
        });
    }
    return users;
};

const following = (state = INITIAL_STATE, { type, payload }) => {
    let newState;
    switch (type) {
        case UserActions.LOG_IN_USER:
            newState = getFollowing(payload.following);
            break;
        default:
            newState = state;
            break;
    }
    return newState;
};

export default following;
