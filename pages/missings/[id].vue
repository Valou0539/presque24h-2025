<template>
  <main class="mx-auto max-w-7xl px-6 pt-36 pb-32 sm:pt-60 lg:px-8 lg:pt-32">
    <section v-if="missing">
      <LayoutHeader
        :title="'Disparu(e) - ' + missing.prenom + ' ' + missing.nom"
      />

      <div class="mt-8 rounded-lg p-6 shadow-md">
        <!-- En-tête avec photo et informations principales -->
        <div class="mb-8 flex flex-col gap-6 md:flex-row">
          <div class="flex w-full flex-col items-center md:w-1/3">
            <!-- Placeholder pour photo -->
            <div
              class="mb-4 flex h-48 w-48 items-center justify-center rounded-full bg-gray-200"
            >
              <UserIcon class="h-24 w-24 text-gray-400" />
            </div>

            <!-- Statut -->
            <div
              :class="`rounded-full px-4 py-2 text-sm font-medium ${missing.statut.includes('Décédé') ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'}`"
            >
              {{ missing.statut }}
            </div>
          </div>

          <div class="w-full md:w-2/3">
            <h2 class="mb-2 text-2xl font-bold text-contrast">
              {{ missing.prenom }} {{ missing.nom }}
            </h2>

            <!-- Informations personnelles -->
            <div class="space-y-3">
              <div class="flex items-center">
                <CalendarIcon class="mr-2 h-5 w-5 text-gray" />
                <span class="font-medium text-contrast"
                  >Date de naissance:</span
                >
                <span class="ml-2">{{
                  formatDate(missing.dateNaissance)
                }}</span>
              </div>

              <div class="flex items-start">
                <BriefcaseIcon class="mt-1 mr-2 h-5 w-5 text-gray" />
                <span class="font-medium text-contrast">Affectation:</span>
                <span class="ml-2 whitespace-pre-line">{{
                  missing.affectation
                }}</span>
              </div>

              <div class="flex items-center">
                <AcademicCapIcon class="mr-2 h-5 w-5 text-gray" />
                <span class="font-medium text-contrast">Rang:</span>
                <span class="ml-2">{{ missing.rang }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Détails de la disparition -->
        <div class="mt-6 border-t border-low-contrast pt-6">
          <h3 class="mb-4 flex items-center text-lg font-medium text-contrast">
            <ExclamationTriangleIcon class="mr-2 h-5 w-5 text-amber-500" />
            Informations sur la disparition
          </h3>

          <div class="space-y-4">
            <div class="flex items-center">
              <CalendarIcon class="mr-2 h-5 w-5 text-gray" />
              <span class="font-medium text-contrast"
                >Date de disparition:</span
              >
              <span class="ml-2">{{
                formatDate(missing.dateDisparition)
              }}</span>
            </div>

            <div class="flex items-start">
              <MapPinIcon class="mt-1 mr-2 h-5 w-5 text-gray" />
              <span class="font-medium text-contrast">Dernier contact:</span>
              <span class="ml-2 whitespace-pre-line">{{
                missing.dernierContact
              }}</span>
            </div>
          </div>
        </div>

        <!-- Résumé -->
        <div class="mt-6 border-t border-low-contrast pt-6">
          <h3 class="mb-4 flex items-center text-lg font-medium text-contrast">
            <DocumentTextIcon class="mr-2 h-5 w-5 text-blue-500" />
            Résumé
          </h3>

          <div class="rounded-md bg-low-contrast p-4">
            <p class="text-text whitespace-pre-line">
              {{ missing.resume }}
            </p>
          </div>
        </div>

        <!-- Annexes -->
        <div class="mt-6 border-t border-low-contrast pt-6">
          <h3 class="mb-4 flex items-center text-lg font-medium text-contrast">
            <PaperClipIcon class="mr-2 h-5 w-5 text-gray" />
            Annexes
          </h3>

          <div class="rounded-md bg-low-contrast p-4">
            <p class="text-text whitespace-pre-line">
              {{ missing.annexes }}
            </p>
          </div>
        </div>
      </div>

      <!-- Bouton de retour -->
      <div class="mt-8">
        <Button :as="NuxtLink" to="/missings" severity="secondary">
          <ArrowLeftIcon class="mr-2 h-5 w-5" />
          Retour à la liste
        </Button>
      </div>
    </section>

    <section v-else class="py-12 text-center">
      <ExclamationCircleIcon class="mx-auto mb-4 h-16 w-16 text-red-500" />
      <h2 class="text-2xl font-bold text-gray-900">
        Personne disparue non trouvée
      </h2>
      <p class="mt-2 text-gray-600">
        L'identifiant spécifié n'existe pas dans notre base de données.
      </p>
      <Button :as="NuxtLink" to="/missings" severity="secondary">
        <ArrowLeftIcon class="mr-2 h-5 w-5" />
        Retour à la liste
      </Button>
    </section>
  </main>
</template>

<script setup lang="ts">
import missings from "~/assets/jsons/missing.json";
import {
  UserIcon,
  CalendarIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  ExclamationTriangleIcon,
  MapPinIcon,
  DocumentTextIcon,
  PaperClipIcon,
  ArrowLeftIcon,
  ExclamationCircleIcon,
} from "@heroicons/vue/24/outline";
import { NuxtLink } from "#components";

const { id } = useRoute().params;
const missing = missings.find((m) => m.id === id);

useHead({
  title: `Les disparus - ${missing?.prenom} ${missing?.nom}`,
  description: `Les disparus de la guilde en lien avec l'affaire de la Dame en Rouge`,
});

// Format the date in a readable format
const formatDate = (dateString: string) => {
  if (!dateString) return "";

  const date = new Date(dateString);
  return new Intl.DateTimeFormat("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};
</script>
