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
const selectedPoint = ref("clairiere-trois-fers");

const pointsOfInterest = [
  {
    id: "clairiere-trois-fers",
    name: "Clairière des Trois-Fers",
    description:
      "Clairière reculée, marquée par trois fers plantés dans le sol, dont l’origine reste inconnue. On dit que les chevaux refusent d’y entrer au coucher du soleil.",
    x: "83.1%",
    y: "7.5%",
  },
  {
    id: "grotte-visitable",
    name: "Grotte visitable",
    description:
      "Grotte humide et sinueuse, abritant des stalactites en forme d’animaux. Un guide local jure avoir entendu un souffle dans le noir… et vu deux yeux s’ouvrir dans la pierre.",
    x: "56%",
    y: "16.5%",
  },
  {
    id: "chapelle-saint-lonard",
    name: "Chapelle de Saint-Lonard",
    description:
      "Petite chapelle en pierre, partiellement en ruine, où l’on entendrait encore les cloches sonner la nuit, bien qu’elles aient disparu depuis des décennies.",
    x: "89.5%",
    y: "40%",
  },
  {
    id: "village-paimpont",
    name: "Village de Paimpont",
    description:
      "Village connu pour ses fêtes en l’honneur de l’esprit de la forêt. Les habitants y vivent au rythme des saisons, entre contes anciens et artisanat druidique.",
    x: "63.6%",
    y: "42.4%",
  },
  {
    id: "dolmen",
    name: "Dolmen",
    description:
      "Ancien monument mégalithique, probablement funéraire. Il est dit qu’à la pleine lune, des lueurs bleutées s’en échappent, guidant les âmes des anciens.",
    x: "16.8%",
    y: "34%",
  },
  {
    id: "village-ploemel",
    name: "Village de Ploëmel",
    description:
      "Autrefois rival de Paimpont, ce village abrite des pierres levées gravées de symboles oubliés. Le soir, des chants étranges s’élèvent parfois des champs avoisinants.",
    x: "32%",
    y: "56.4%",
  },
  {
    id: "chateau-roche-voilee",
    name: "Château de Roche-Voilée",
    description:
      "Vestiges d’un château construit à même la falaise, souvent enveloppé d’une brume dense. Les visiteurs affirment y avoir vu des silhouettes errer entre les murs écroulés.",
    x: "12.7%",
    y: "56.5%",
  },
  {
    id: "dolmen",
    hide: true,
    x: "44.2%",
    y: "72.2%",
  },
  {
    id: "vieux-chene",
    name: "Vieux chêne",
    description:
      "Arbre millénaire au tronc immense, creusé par le temps et les légendes. Certains disent qu’il exauce les vœux, d’autres qu’il les vole en silence.",
    x: "25.8%",
    y: "81.2%",
  },
  {
    id: "grotte-visitable",
    hide: true,
    x: "60.9%",
    y: "88%",
  },
];
</script>
