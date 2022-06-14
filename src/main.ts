import { createApp } from 'vue';

import App from './App.vue'
import { StoreNames } from './enums/store-names';
import router from './router';
import store from './store';
import './index.css';

store.dispatch(`${StoreNames.ConfigStore}/setAxiosInterceptors`, router);

createApp(App)
  .use(store)
  .use(router)
  .mount('#app');
