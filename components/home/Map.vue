<template>
  <section class="mx-auto max-w-7xl px-6 py-12 lg:px-8">
    <h2 class="mb-8 text-4xl font-bold">Points d'intérêt</h2>
    <div class="flex flex-col items-center justify-center gap-8 md:flex-row">
      <div class="relative aspect-square w-full md:w-1/2">
        <NuxtImg src="/images/broceliande-map.png" class="size-full" />
        <span
          v-for="(point, index) in pointsOfInterest"
          @click="selectedPoint = point.id"
          :style="{ left: point.x, top: point.y }"
          :key="index"
          :class="selectedPoint === point.id ? 'bg-primary-500' : 'bg-black'"
          class="absolute size-[3.8%] cursor-pointer rounded-full"
        />
      </div>
      <Accordion
        :value="selectedPoint"
        @update:value="selectedPoint = $event"
        class="flex w-full flex-col gap-4 md:w-1/2"
      >
        <AccordionPanel
          v-for="point in pointsOfInterest.filter((p) => !p.hide)"
          :key="point.id"
          :value="point.id"
        >
          <AccordionHeader>{{ point.name }}</AccordionHeader>
          <AccordionContent>
            <p>{{ point.description }}</p>
          </AccordionContent>
        </AccordionPanel>
      </Accordion>
    </div>
  </section>
</template>

<script lang="ts" setup>
import pointsOfInterest from "~/assets/jsons/places.json";

const selectedPoint = ref(pointsOfInterest[0].id);
</script>
