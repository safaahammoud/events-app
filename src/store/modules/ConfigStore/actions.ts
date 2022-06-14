import axios from "axios";
import { ActionContext } from "vuex";
import { Router } from 'vue-router';

import store from '@/store';

import { StoreNames } from './../../../enums/store-names';
import { ConfigState } from './state';
import { RootState } from '../../state';

const nonAuthRoutesUrls = ['/events', '/event-details'];
const authRoutesUrls = ['/login'];

export default {
    setAxiosInterceptors(_context: ActionContext<ConfigState, RootState>, router: Router) {
        axios.interceptors.request.use(
            (request) => {
                const isNonAuthRoute = nonAuthRoutesUrls.some((route) => (
                    router.currentRoute.value.path.includes(route)
                ));
                const isAuthRequest = authRoutesUrls.some((route) => (
                    router.currentRoute.value.path.includes(route)
                ));
                let newRequest = {
                    ...request,
                    timeout: 15000,
                };

                if(!isNonAuthRoute && !isAuthRequest) {
                    const userToken = store.getters[`${StoreNames.UserStore}/userToken`];

                    newRequest = {
                        ...newRequest,
                        headers: {
                            ...request.headers,
                            Authorization: `Bearer ${userToken}`
                        }
                    }
                }

                return newRequest;
            }
        )
    }
}