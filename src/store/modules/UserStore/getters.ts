import { UserState } from './state';

export default {
  userToken({ userToken }: UserState): string | null {
    return userToken || window.localStorage.getItem('user_token');
  }
}