<template>
  <div class="bg-white">
    <div class="max-w-2xl mx-auto px-4 sm:pt-8 sm:px-6 lg:max-w-7xl lg:px-8">
      <h2 class="text-2xl font-extrabold tracking-tight text-gray-900">
        Lets discover some cool events!
      </h2>

      <div class="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        <div
          v-for="event of events"
          :key="event.id"
          class="group"
        >
          <div class="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
            <img
              :src="formatImageUrl(event.image)"
              alt="Event Image"
              class="w-full h-full object-center object-cover lg:w-full lg:h-full"
            >
          </div>

          <div class="mt-4 flex flex-col justify-between">
            <h3 class="text-sm text-gray-700">
              {{ event.name }}
            </h3>

            <p class="mt-1 text-sm text-gray-500">
              {{ formatDate(event.startDate) }} - {{ formatDate(event.endDate) }}   
            </p>
          </div>
          <div class="flex justify-center mt-4">
            <button
              class="uppercase min-w-[8rem] bg-green-600 py-2 px-4 border border-transparent text-sm font-medium rounded-full text-white hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-slate-900"
              @click="goToEventDetails(event.id)"
            >
              view
            </button>
          </div>
        </div>
      </div>

      <div class="flex justify-center my-4">
        <button
          v-for="page of paginationLinks"
          :key="page.label"
          :disabled="page.active"
          class="cursor-pointer bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
          @click="selectPage(page)"
        >
          {{ page.label }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import formatDate from '@/utils/formatDate';

import { FetchEventsApiParams, getEvents } from './api/eventsAPI';
import { Event, PageLink } from './types/Event.type';
import formatImageUrl from './utils/formatImageUrl';

export default defineComponent({
    name: 'EventList',
    data: () => ({
        currentPage: 1,
        events: [] as Event[],
        paginationLinks: [] as PageLink[],
    }),
    created(): void {
        this.fetchEvents();
    },
    methods: {
        formatDate,
        formatImageUrl,
        async fetchEvents(payload?: FetchEventsApiParams): Promise<void> {
            const { data: events, meta } = await getEvents(payload);

            this.events = events;
            this.paginationLinks = meta.links;
        },
        goToEventDetails(id: string): void {
            this.$router.push({
                name: 'event-details',
                params: { id },
            });
        },
        selectPage(page: PageLink): void {
            this.currentPage = Number(page.label);

            this.fetchEvents({ page:  this.currentPage});
        },
    },
});
</script>
