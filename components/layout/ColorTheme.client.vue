<template>
  <button
    aria-label="Toggle color mode"
    @click="
      $colorMode.preference = $colorMode.value === 'light' ? 'dark' : 'light'
    "
  >
    <component
      :is="$colorMode.value === 'light' ? MoonIcon : SunIcon"
      class="size-5"
    />
  </button>
</template>

<script lang="ts" setup>
import { MoonIcon, SunIcon } from "@heroicons/vue/24/outline";
</script>
