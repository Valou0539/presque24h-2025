<template>
  <main
    class="mx-auto min-h-[90vh] max-w-7xl px-6 pt-36 pb-32 sm:pt-60 lg:px-8 lg:pt-32"
  >
    <section>
      <LayoutHeader
        title="Les chasses"
        description="Liste des chasses de la guilde"
      />

      <div class="mb-4 flex justify-end">
        <Button :as="NuxtLink" to="/chasses/create" severity="primary">
          <PlusIcon class="mr-2 h-5 w-5" />
          Nouvelle chasse
        </Button>
      </div>

      <DataTable
        v-if="chasses && chasses.length > 0"
        size="large"
        :value="chasses"
        :loading="pending"
      >
        <Column field="nom" header="Nom" />
        <Column field="lieu" header="Lieu" />
        <Column
          :field="(chasse) => DateTime.fromISO(chasse.date).toLocaleString()"
          header="Date"
        />
        <Column>
          <template #body="slotProps">
            <Button
              @click.stop="confirmDelete(slotProps.data.id)"
              icon="pi pi-trash"
              severity="danger"
              text
            />
          </template>
        </Column>
      </DataTable>

      <div v-else-if="pending" class="py-10 text-center">
        <div class="flex justify-center">
          <i class="pi pi-spin pi-spinner text-4xl"></i>
        </div>
        <p class="text-text mt-4">Chargement des chasses...</p>
      </div>

      <div v-else-if="chasses" class="py-10 text-center">
        <InformationCircleIcon class="mx-auto mb-4 h-16 w-16 text-blue-500" />
        <h2 class="text-2xl font-bold text-contrast">
          Aucune chasse disponible
        </h2>
        <p class="text-text mt-2">
          Créez votre première chasse en cliquant sur le bouton ci-dessus.
        </p>
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
          <p>Êtes-vous sûr de vouloir supprimer cette chasse ?</p>
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
            @click="deleteChasse"
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
import type { IChasse } from "~/types/chasse";
import { DateTime } from "luxon";

useSeoMeta({
  title: "Les chasses",
  description: "Liste des chasses de la guilde",
});
definePageMeta({
  middleware: "connected",
});

const authStore = useAuthStore();
const deleteDialogVisible = ref(false);
const deleteLoading = ref(false);
const chasseToDeleteId = ref<number | null>(null);

const chasses = ref<IChasse[]>([]);
const pending = ref(false);

// Gestion de la suppression
const confirmDelete = (id: number) => {
  chasseToDeleteId.value = id;
  deleteDialogVisible.value = true;
};

const deleteChasse = async () => {
  deleteLoading.value = true;
  await authStore.fetch(`/api/chasse/${chasseToDeleteId.value}`, {
    method: "DELETE",
    onResponse: () => {
      deleteDialogVisible.value = false;
      getChasses();
      deleteLoading.value = false;
    },
  });
};

const getChasses = async () => {
  pending.value = true;
  chasses.value = await authStore.fetch<IChasse[]>("/api/chasse");
  pending.value = false;
};

onMounted(() => {
  getChasses();
});
</script>
