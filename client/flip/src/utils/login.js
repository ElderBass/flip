import store from "../store";
import { loginUser } from "../api";
import * as UserActions from "../store/actions/user";

const login = async ({ email, password }) => {
  const loginResult = await loginUser( { email, password });
  console.log('\n\n result on logging in user after signup - ', loginResult, '\n\n');
  const { user, token } = loginResult.data;
  const payload = { user, token };
  await store.dispatch(UserActions.loginUser(payload));
  localStorage.setItem('userLoggedIn', true);
  localStorage.setItem('userToken', token);
};

export { login };
