<template>
  <div>
    <div class="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
      <img
        :src="formatImageUrl(event.image)"
        alt="Front of men&#039;s Basic Tee in black."
        class="w-full h-full object-center object-cover lg:w-full lg:h-full"
      >
    </div>

    <div class="px-4 my-4 flex flex-col justify-between">
      <h3 class="text-2xl font-extrabold tracking-tight text-gray-900 m-auto mb-3">
        {{ event.name }}
      </h3>
	
      <p class="text-sm text-gray-700">
        {{ event.description }}
      </p>

      <p class="my-5 text-sm text-gray-500">
        {{ formatDate(event.startDate) }} - {{ formatDate(event.endDate) }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import formatDate from '@/utils/formatDate';

import { getEventDetails } from './api/eventsAPI';
import { Event } from './types/Event.type';
import formatImageUrl from './utils/formatImageUrl';

export default defineComponent({
	data: () => ({
		event: {} as Event,
	}),
	async created() {
		({ data: this.event } = await getEventDetails(+this.$route.params.id));

		this.event.image = formatImageUrl(this.event.image);
	},
	methods: {
		formatImageUrl,
		formatDate,
	}
});
</script>
