<template>
  <div class="px-6 py-24 sm:py-32 lg:px-8">
    <div class="mx-auto max-w-2xl text-center">
      <h2
        class="text-5xl font-semibold tracking-tight text-contrast sm:text-7xl"
      >
        {{ title }}
      </h2>
      <p
        v-if="description"
        class="mt-8 text-lg font-medium text-pretty text-gray sm:text-xl/8"
      >
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ title: string; description?: string }>();
</script>
