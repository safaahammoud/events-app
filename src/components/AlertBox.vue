/* eslint-disable vue/require-default-prop */
<template>
  <div role="alert">
    <div class="border border-red-400 rounded px-4 py-3 text-red-700">
      {{ message }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: 'AlertBox',
    props: {
        message: {
            type: String,
            required: true,
        },
    }
});
</script>
