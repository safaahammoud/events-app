import { createStore } from "vuex";

import configStore from './modules/ConfigStore';
import userStore from './modules/UserStore';

export default createStore({
  modules: {
    'configStore': configStore,
    'userStore': userStore,
  },
});
