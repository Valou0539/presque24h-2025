<template>
  <main class="mx-auto max-w-7xl px-6 pt-36 pb-32 sm:pt-60 lg:px-8 lg:pt-32">
    <section>
      <LayoutHeader
        title="Nouvelle chasse"
        description="Créer une nouvelle chasse"
      />
    </section>

    <div class="bg-surface mx-auto mt-8 max-w-xl rounded-lg p-6 shadow">
      <Form
        v-slot="$form"
        :initialValues="initialValues"
        :resolver="resolver"
        class="flex flex-col gap-6"
        @submit="onFormSubmit"
      >
        <LabelWithError
          :error="$form.nom?.error?.message"
          :show-error="$form.nom?.invalid"
          label="Nom de la chasse"
        >
          <InputText
            fluid
            name="nom"
            placeholder="Entrez le nom de la chasse"
          />
        </LabelWithError>

        <LabelWithError
          :error="$form.lieu?.error?.message"
          :show-error="$form.lieu?.invalid"
          label="Lieu"
        >
          <Select
            fluid
            name="lieu"
            :options="pointsOfInterest.filter((p) => !p.hide)"
            optionLabel="name"
            optionValue="name"
          />
        </LabelWithError>

        <LabelWithError
          :error="$form.date?.error?.message"
          :show-error="$form.date?.invalid"
          label="Date"
        >
          <Calendar name="date" dateFormat="dd/mm/yy" fluid />
        </LabelWithError>

        <div class="mt-6 flex gap-4">
          <Button
            :as="NuxtLink"
            to="/chasses"
            severity="secondary"
            outlined
            class="min-w-[120px]"
          >
            <ArrowLeftIcon class="mr-2 h-5 w-5" />
            Retour
          </Button>
          <Button
            type="submit"
            severity="primary"
            :loading="loading"
            class="flex-1"
          >
            Créer la chasse
          </Button>
        </div>

        <div v-if="responseError" class="mt-2 text-center text-sm text-red-500">
          {{ responseError }}
        </div>
      </Form>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { z } from "zod";
import LabelWithError from "~/components/form/LabelWithError.vue";
import { NuxtLink } from "#components";
import { useAuthStore } from "~/store/authStore";
import { ArrowLeftIcon } from "@heroicons/vue/24/outline";
import type { FormSubmitEvent } from "@primevue/forms";
import type { IChasse } from "~/types/chasse";
import { DateTime } from "luxon";
import pointsOfInterest from "~/assets/jsons/places.json";

useSeoMeta({
  title: "Créer une chasse",
  description: "Créer une nouvelle chasse",
});
definePageMeta({
  middleware: "connected",
});

type ChasseForm = Omit<IChasse, "id">;

const initialValues = ref<ChasseForm>({
  nom: "",
  lieu: "",
  date: "",
});

// Définir le resolver avec Zod pour la validation du formulaire
const resolver = ref(
  zodResolver(
    z.object({
      nom: z.string().nonempty("Le nom est requis"),
      lieu: z.string().nonempty("Le lieu est requis"),
      date: z.date(),
    }),
  ),
);

const loading = ref(false);
const responseError = ref<string | null>(null);
const authStore = useAuthStore();

const onFormSubmit = async (form: FormSubmitEvent) => {
  responseError.value = null;
  console.log(form);

  if (form.valid) {
    loading.value = true;

    await authStore.fetch("/api/chasse", {
      method: "POST",
      body: {
        ...(form.values as ChasseForm),
        date: DateTime.fromJSDate(form.values.date).toISODate(),
      },
      onResponse: () => {
        loading.value = false;
        form.reset();
        navigateTo("/chasses");
      },
    });
  }
};
</script>
