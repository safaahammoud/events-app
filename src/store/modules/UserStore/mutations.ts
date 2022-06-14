import { UserState } from './state';

export default {
    setUserToken(state: UserState, token: string) {
        state.userToken = token;
        window.localStorage.setItem('user_token', token);
    }
}