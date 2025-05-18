<template>
  <article
    class="relative isolate flex aspect-[9/16] flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pt-80 pb-8"
    tabindex="0"
    @focus="showDescription = true"
    @blur="showDescription = false"
    @mouseover="showDescription = true"
    @mouseleave="showDescription = false"
  >
    <NuxtImg
      :src="monster.image"
      alt=""
      :class="showDescription ? 'sm:brightness-50' : ''"
      class="absolute inset-0 -z-10 size-full object-cover transition-all duration-300"
    />
    <div
      class="absolute inset-0 -z-10 bg-linear-to-t from-gray-900 via-gray-900/40"
    />
    <div
      class="absolute inset-0 -z-10 rounded-2xl ring-1 ring-gray-900/10 ring-inset"
    />
    <!-- golden hallow at the top left
    -->
    <div v-if="prime" class="absolute -top-24 -left-24 size-[180%] bg-radial to-amber-400/40 from-transparent" />

    <h3 class="mt-3 text-lg/6 font-semibold text-white">
      {{ monster.name }}
    </h3>
    <div
      class="transition-all duration-500"
      :class="showDescription ? 'max-h-full' : 'overflow-hidden sm:max-h-0'"
    >
      <p class="mt-2 text-lg/8 text-gray-400">
        {{ monster.description }}
      </p>
    </div>
  </article>
</template>

<script lang="ts" setup>
import type { Monster } from "~/types/monster";

defineProps<{ monster: Monster, prime?: boolean }>();

const showDescription = ref(false);
</script>
