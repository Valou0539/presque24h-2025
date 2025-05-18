<template>
  <div class="py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <h2
          class="text-4xl font-semibold tracking-tight text-balance text-contrast sm:text-5xl"
        >
          Monstres
        </h2>
        <p class="mt-2 text-lg/8 text-gray">
          Découvrez les monstres les plus terrifiants de la mythologie.
        </p>
      </div>
      <div
        class="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-3 lg:mx-0 lg:max-w-none"
      >
        <MonsterCard
          v-for="(monster, index) in monsters.slice(0, 3)"
          :key="index"
          :monster="monster"
        />
      </div>
      <div class="mt-8 flex justify-end">
        <Button :as="NuxtLink" severity="primary" to="/monsters"
          >Voir tous les monstres</Button
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { NuxtLink } from "#components";
import monsters from "~/assets/jsons/monsters.json";
</script>
