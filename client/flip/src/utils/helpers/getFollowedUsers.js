import { getAllUsers } from '../../api';

export const getFollowedUsers = async (ids) => {
    const allUsersResponse = await getAllUsers();
    const users = allUsersResponse.data.users.filter((user) => ids.includes(user._id))

    return users
};
