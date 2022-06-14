<template>
  <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <img
          class="mx-auto h-12 w-auto"
          src="@/assets/logos/ticketpass_logo.svg"
          alt="Workflow"
        >
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <AlertBox
        v-show="errorMessage"
        :message="errorMessage"
      />

      <form @submit.prevent="submitLoginForm">
        <div class="my-8">
          <input
            v-model="loginFormValues.email"
            required
            name="email"
            type="email"
            autocomplete="email"
            class="appearance-none rounded-full block w-full px-3 py-2 mb-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Email address"
          >

          <input
            v-model="loginFormValues.password"
            required
            name="password"
            type="password"
            autocomplete="current-password"
            class="appearance-none rounded-full block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Password"
          >
        </div>

        <div class="text-center">
          <button
            type="submit"
            class="uppercase min-w-[10rem] bg-green-600 py-2 px-4 border border-transparent text-sm font-medium rounded-full text-white hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-slate-900"
          >
            log in
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapMutations } from 'vuex';

import AlertBox from '@/components/AlertBox.vue';
import { StoreNames } from '@/enums/store-names';
import axios from 'axios';

export default defineComponent({
  name: "LoginView",
  components: {
    AlertBox,
  },
  data: () => ({
    errorMessage: '',
    loginFormValues: {
      email: 'test@ticketpass.org',
      password: 'Ticketpass2022',
    },
  }),
  methods: {
    ...mapMutations(StoreNames.UserStore, ['setUserToken']),
    async submitLoginForm() {
      this.errorMessage = '';
      
      try {
        const response = await axios.post("http://127.0.0.1:8001/api/login", {
          grant_type: "password",
          client_id: "966c01ba-31b1-40a2-8f4c-fab8b1373bd7",
          username: this.loginFormValues.email,
          password: this.loginFormValues.password,
        });

        this.setUserToken(response.data.access_token);
        
        this.$router.push({ name: 'create-event' });
      } catch (error: any) {
        this.errorMessage = error.response.data.message;
      }
    },
  },
});
</script>
