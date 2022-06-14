import { createRouter, RouteRecordRaw, createWebHistory } from 'vue-router';

import store from '@/store';

import { StoreNames } from './../enums/store-names';
import Login from '../views/Login.vue';
import EventList from '../views/Events/EventList.vue';
import EventDetails from '../views/Events/EventDetails.vue';
import CreateEvent from '../views/Events/CreateEvent.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: 'events',
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/events',
    name: 'events',
    component: EventList,
  },
  {
    path: '/event-details/:id',
    name: 'event-details',
    component: EventDetails
  },
  {
    path: '/create-event',
    name: 'create-event',
    component: CreateEvent,
    beforeEnter: (to, _from, next) => {
      const userToken = store.getters[`${StoreNames.UserStore}/userToken`];
      
      if(!userToken) {
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        })
      } else {
        next();
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
