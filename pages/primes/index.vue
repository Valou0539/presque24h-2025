<template>
  <main
    class="mx-auto min-h-[90vh] max-w-7xl px-6 pt-36 pb-32 sm:pt-60 lg:px-8 lg:pt-32"
  >
    <section>
      <LayoutHeader
        title="Les primes"
        description="Liste des primes de la guilde"
      />

      <div class="mb-4 flex justify-end">
        <ClientOnly>
          <Button
            v-if="authStore.user?.role === 'Admin'"
            :as="NuxtLink"
            to="/primes/create"
            severity="primary"
          >
            <PlusIcon class="mr-2 h-5 w-5" />
            Nouvelle Prime
          </Button>
        </ClientOnly>
      </div>

      <div
        v-if="primes && primes.length > 0"
        class="grid grid-cols-1 gap-8 sm:grid-cols-3"
      >
        <div
          v-for="monster in primes.map((p) => {
            const monster = monsters.find((m) => m.id === p.nom);
            monster.prime_id = p.id;
            monster.prix = p.prix;
            return monster;
          })"
          :key="monster.id"
          class="relative overflow-hidden rounded-2xl"
        >
          <MonsterCard :monster="monster" prime />

          <span class="absolute top-4 left-4 text-6xl font-bold">{{
            monster.prix
          }}</span>

          <ClientOnly>
            <button
              v-if="authStore.user?.role === 'Admin'"
              @click.stop="confirmDelete(monster.prime_id)"
              class="absolute top-4 right-4 cursor-pointer rounded-xl p-2 hover:bg-red-500/20"
            >
              <TrashIcon class="size-12 text-red-500" />
            </button>
          </ClientOnly>

          <div class="relative inset-0 -z-10 size-full bg-red-200/90" />
        </div>
      </div>

      <div v-else-if="pending" class="py-10 text-center">
        <div class="flex justify-center">
          <i class="pi pi-spin pi-spinner text-4xl"></i>
        </div>
        <p class="text-text mt-4">Chargement des primes...</p>
      </div>

      <div v-else-if="primes" class="py-10 text-center">
        <InformationCircleIcon class="mx-auto mb-4 h-16 w-16 text-blue-500" />
        <h2 class="text-2xl font-bold text-contrast">
          Aucune prime disponible
        </h2>
      </div>

      <!-- Dialog de confirmation de suppression -->
      <Dialog
        v-model:visible="deleteDialogVisible"
        modal
        header="Confirmer la suppression"
        :style="{ width: '450px' }"
      >
        <div class="text-center">
          <ExclamationTriangleIcon
            class="mx-auto mb-4 h-16 w-16 text-amber-500"
          />
          <p>Êtes-vous sûr de vouloir supprimer cette prime ?</p>
          <p class="mt-2 text-sm text-gray">Cette action est irréversible.</p>
        </div>
        <template #footer>
          <Button
            @click="deleteDialogVisible = false"
            severity="secondary"
            text
          >
            Annuler
          </Button>
          <Button
            @click="deletePrime"
            severity="danger"
            :loading="deleteLoading"
          >
            Supprimer
          </Button>
        </template>
      </Dialog>
    </section>
  </main>
</template>

<script setup lang="ts">
import {
  BriefcaseIcon,
  PlusIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  ArrowPathIcon,
  ExclamationTriangleIcon,
} from "@heroicons/vue/24/outline";
import { NuxtLink } from "#components";
import { useAuthStore } from "~/store/authStore";
import type { IPrime } from "~/types/prime";
import { DateTime } from "luxon";
import monsters from "~/assets/jsons/monsters.json";
import { TrashIcon } from "@heroicons/vue/24/outline";

useSeoMeta({
  title: "Les primes",
  description: "Liste des primes de la guilde",
});
definePageMeta({
  middleware: "connected",
});

const authStore = useAuthStore();
const deleteDialogVisible = ref(false);
const deleteLoading = ref(false);
const primeToDeleteId = ref<number | null>(null);

const primes = ref<IPrime[]>([]);
const pending = ref(false);

// Gestion de la suppression
const confirmDelete = (id: number) => {
  primeToDeleteId.value = id;
  deleteDialogVisible.value = true;
};

const deletePrime = async () => {
  deleteLoading.value = true;
  await authStore.fetch(`/api/prime/${primeToDeleteId.value}`, {
    method: "DELETE",
    onResponse: () => {
      deleteDialogVisible.value = false;
      getPrimes();
      deleteLoading.value = false;
    },
  });
};

const getPrimes = async () => {
  pending.value = true;
  primes.value = await authStore.fetch<IPrime[]>("/api/prime");
  pending.value = false;
};

onMounted(() => {
  getPrimes();
});
</script>
