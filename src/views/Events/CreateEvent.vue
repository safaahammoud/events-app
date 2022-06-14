<template>
  <div class="px-4 md:px-64 lg:px-96">
    <AlertBox
      v-show="errorMessage"
      :message="errorMessage"
    />

    <form @submit.prevent="submitCreateEvent">
      <div class="my-8">
        <div>
          <label>Event Name <span class="text-red-700">*</span></label>
          <input
            ref="eventName"
            v-model="formValues.name"
            name="eventName"
            class="peer border border-slate-400 appearance-none rounded-full block w-full px-3 py-2 mb-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Event name"
            @blur="validateField(formValues.name, 'name')"
            @input="validateField(formValues.name, 'name')"
          >

          <p
            :class="{
              'text-red-700 font-light': true,
              'visible': errors.name,
              'invisible': !errors.name
            }"
          >
            {{ errors.name }}
          </p>
        </div>

        <div class="flex justify-between flex-wrap">
          <div class="w-full sm:w-[50%] pr-0 sm:pr-4">
            <label>Start Date <span class="text-red-700">*</span></label>
            <input
              v-model="formValues.startDate"
              name="startDate"
              type="date"
              class="appearance-none rounded-full block w-full px-3 py-2 mb-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="select value"
              @blur="validateField(formValues.startDate, 'startDate')"
              @input="validateField(formValues.startDate, 'startDate')"
            >

            <p
              :class="{
                'text-red-700 font-light': true,
                'visible': errors.startDate,
                'invisible': !errors.startDate
              }"
            >
              {{ errors.startDate }}
            </p>
          </div>

          <div class="w-full sm:w-[50%] pl-0 sm:pl-4">
            <label>End Date<span class="text-red-700">*</span></label>
            <input
              v-model="formValues.endDate"
              name="endDate"
              type="date"
              autocomplete="email"
              class="appearance-none rounded-full block w-full px-3 py-2 mb-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
              @blur="validateField(formValues.endDate, 'endDate')"
              @input="validateField(formValues.endDate, 'endDate')"
            >

            <p
              :class="{
                'text-red-700 font-light': true,
                'visible': errors.endDate,
                'invisible': !errors.endDate
              }"
            >
              {{ errors.endDate }}
            </p>
          </div>
        </div>
            
        <div>
          <label>Event Description<span class="text-red-700">*</span></label>
          <textarea
            v-model="formValues.description"
            placeholder="About your event"
            class="appearance-none rounded block w-full px-3 py-2 mb-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            @blur="validateField(formValues.description, 'description')"
            @input="validateField(formValues.description, 'description')"
          />

          <p
            :class="{
              'text-red-700 font-light': true,
              'visible': errors.description,
              'invisible': !errors.description
            }"
          >
            {{ errors.description }}
          </p>
        </div>

        <div class="block">
          <label>Event Image</label>
          <input
            type="file"
            accept="image/png, image/gif, image/jpeg"
            class="block w-full text-sm text-slate-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-violet-50 file:text-violet-700
                        hover:file:bg-violet-100
                    "
            @change="getEventPhoto($event.target.files[0])"
          >

          <p
            :class="{
              'text-red-700 font-light': true,
              'visible': errors.image,
              'invisible': !errors.image
            }"
          >
            {{ errors.image }}
          </p>
        </div>
      </div>

      <p
        v-if="isFormSubmitted && !isFormValid"
        class="peer-invalid:visible text-red-700 font-light"
      >
        Please fill all required fields
      </p>

      <div class="text-center mt-8">
        <button
          type="submit"
          :aria-disabled="isLoading"
          class="min-w-[10rem] uppercase w-100px min-w-100 bg-green-600 py-2 px-4 border border-transparent text-sm font-medium rounded-full text-white hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-slate-900"
          @click="submitCreateEvent"
        >
          <div class="flex justify-around items-center">
            submit

            <div
              v-show="isLoading"
              class="spinner-border animate-spin inline-block w-6 h-6 border-4 rounded-full"
              role="status"
            >
              <span class="visually-hidden" />
            </div>
          </div>
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import AlertBox from '@/components/AlertBox.vue';

import { createEvent } from './api/eventsAPI';
import { AxiosError } from 'axios';

export default defineComponent({
    name: 'CreateEvent',
    components: {
        AlertBox,
    },
    data: () => ({
        errorMessage: '',
        isLoading: false,
        errors: {
            name: '',
            startDate: '',
            endDate: '',
            description: '',
        } as Record<string, string>,
        formValues: {
            name: '',
            startDate: '',
            endDate: '',
            description: '',
            image: new File([], ''),
        },
        isFormValid: false,
        isFormSubmitted: false,
    }),
    computed: {
        validationRules() {
            return {
                required: (value: string) => (
                    value ? '' : 'please fill this required field'
                ),
            }
        },
    },
    methods: {
        validateField(fieldValue: string, fieldName: string): void {
            this.errors[fieldName] = this.validationRules.required(fieldValue) || '';
        },
        async submitCreateEvent(): Promise<void> {
            this.errors = {};
            this.isFormSubmitted = true;
            this.isFormValid = (!Object.values(this.formValues).some(value => !value));

            if (!this.isFormValid) {
                return;
            }

            this.isFormValid = true;
            this.isLoading = true;

            const formData = new FormData();

            formData.append('name', this.formValues.name);
            formData.append('startDate', new Date(this.formValues.startDate).getTime().toString());
            formData.append('endDate', new Date(this.formValues.endDate).getTime().toString());
            formData.append('description', this.formValues.description);
            formData.append('image', this.formValues.image);

            const response = await createEvent(formData)
                .catch((error: AxiosError) => {
                  this.errorMessage = error.message;
                })
                .finally(() => this.isLoading = false);

            if (response?.errors) {
              this.errors = response?.errors;
            }
        },
        getEventPhoto(files: File) {
            this.formValues.image = files as File;
        },
    },
});
</script>
