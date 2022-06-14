<template>
  <div>
    <nav
      v-if="!isLoginRoute"
      class="fixed shadow z-10 bg-white w-full flex justify-between py-2 pl-6 pr-4"
    >
      <img
        class="h-8 w-auto"
        src="@/assets/logos/ticketpass_logo.svg"
        alt="Workflow"
      >

      <div>
        <template v-if="userToken">
          <button
            class="uppercase min-w-[10rem] py-2 px-4 mr-2 border border-gray-400 text-sm font-medium rounded-full text-black"
            @click="logout()"
          >
            logout
          </button>
        </template>

        <template v-else>
          <button
            class="uppercase min-w-[10rem] bg-green-600 py-2 px-4 mr-2 border border-transparent text-sm font-medium rounded-full text-white hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-slate-900"
            @click="$router.push({ name: 'create-event' })"
          >
            create event
          </button>

          <button
            class="uppercase min-w-[10rem] py-2 px-4 mr-2 border border-gray-400 text-sm font-medium rounded-full text-black"
            @click="$router.push({ name: 'login'})"
          >
            log in
          </button>
        </template>
      </div>
    </nav>
    <router-view class="pt-14" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters, mapMutations } from "vuex";

import { StoreNames } from '@/enums/store-names';

export default defineComponent({
  name: 'App',
  computed: {
    ...mapGetters(StoreNames.UserStore, ['userToken']),
    isLoginRoute(): boolean {
      return this.$route.name === 'login';
    }
  },
  methods: {
    ...mapMutations(StoreNames.UserStore, ['setUserToken']),
    logout() {      
      this.setUserToken('');

      this.$router.push({ name: 'events'});
    }
  }
})

</script>