<template>
  <main class="mx-auto max-w-7xl px-6 pt-36 pb-32 sm:pt-60 lg:px-8 lg:pt-32">
    <section>
      <LayoutHeader
        title="Les monstres"
        description="Découvrez les monstres les plus terrifiants de brocéliande."
      />
      <div class="grid grid-cols-1 gap-8 sm:grid-cols-3">
        <MonsterCard
          v-for="(monster, index) in monsters"
          :key="index"
          :monster="monster"
        />
      </div>
    </section>
  </main>
</template>

<script setup>
import monsters from "~/assets/jsons/monsters.json";

useSeoMeta({
  title: "Les monstres",
  description: "Découvrez les monstres les plus terrifiants de brocéliande.",
});
</script>
