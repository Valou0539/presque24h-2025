<template>
  <main class="mx-auto max-w-7xl px-6 pt-36 pb-32 sm:pt-60 lg:px-8 lg:pt-32">
    <section>
      <LayoutHeader
        title="Nouvelle prime"
        description="Créer une nouvelle prime"
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
          label="Monstre de la prime"
        >
          <Select
            fluid
            name="nom"
            :options="monsters"
            optionLabel="name"
            optionValue="id"
          />
        </LabelWithError>

        <LabelWithError
          :error="$form.prix?.error?.message"
          :show-error="$form.prix?.invalid"
          label="Prix"
        >
          <InputText fluid name="prix" placeholder="Entrez le prix" />
        </LabelWithError>

        <div class="mt-6 flex gap-4">
          <Button
            :as="NuxtLink"
            to="/primes"
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
            Créer la prime
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
import type { IPrime } from "~/types/prime";
import monsters from "~/assets/jsons/monsters.json";

useSeoMeta({
  title: "Créer une prime",
  description: "Créer une nouvelle prime",
});
definePageMeta({
  middleware: ["connected", "admin"],
});

type PrimeForm = Omit<IPrime, "id">;

const initialValues = ref<PrimeForm>({
  nom: "",
  prix: "",
});

// Définir le resolver avec Zod pour la validation du formulaire
const resolver = ref(
  zodResolver(
    z.object({
      nom: z.string().nonempty("Le nom est requis"),
      prix: z.string().nonempty("Le prix est requis"),
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

    await authStore.fetch("/api/prime", {
      method: "POST",
      body: form.values as PrimeForm,
      onResponse: () => {
        loading.value = false;
        form.reset();
        navigateTo("/primes");
      },
    });
  }
};
</script>
