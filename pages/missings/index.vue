<template>
  <main class="mx-auto max-w-7xl px-6 pt-36 pb-32 sm:pt-60 lg:px-8 lg:pt-32">
    <section>
      <LayoutHeader
        title="Les disparus"
        description="Les disparus de la guilde en lien avec l'affaire de la Dame en Rouge"
      />
    </section>
    <DataTable
      @update:selection="navigateTo(`/missings/${$event.id}`)"
      selectionMode="single"
      size="large"
      :value="missings"
    >
      <Column>
        <template #body> <FolderIcon class="h-6 w-6" /> </template>
      </Column>
      <Column field="prenom" header="Prénom" />
      <Column field="nom" header="Nom" />
      <Column
        :field="
          (missing) =>
            DateTime.fromISO(missing.dateNaissance).toLocaleString(
              DateTime.DATE_FULL,
            )
        "
        header="Date de naissance"
      />
      <Column field="rang" header="Rang" />
      <Column field="statut" header="Statut" />
      <Column
        :field="
          (missing) =>
            DateTime.fromISO(missing.dateDisparition).toLocaleString(
              DateTime.DATE_FULL,
            )
        "
        header="Date de disparition"
      />
    </DataTable>
  </main>
</template>

<script setup lang="ts">
import missings from "~/assets/jsons/missing.json";
import { FolderIcon } from "@heroicons/vue/24/outline";
import { DateTime } from "luxon";

useHead({
  title: "Les disparus",
  description:
    "Les disparus de la guilde en lien avec l'affaire de la Dame en Rouge",
});
</script>
