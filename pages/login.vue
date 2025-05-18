<template>
  <main class="background flex min-h-screen flex-1 px-4 py-20">
    <div class="mx-auto w-full max-w-sm duration-300 lg:w-96 xl:transition-all">
      <div>
        <h2
          class="mt-24 text-2xl/9 font-bold tracking-tight text-contrast lg:mt-32"
        >
          Se connecter
        </h2>
      </div>

      <div class="mt-10">
        <div>
          <Form
            v-slot="$form"
            :initialValues="initialValues"
            :resolver="resolver"
            class="flex flex-col gap-6"
            @submit="onFormSubmit"
          >
            <LabelWithError
              :error="$form.identifier?.error?.message"
              :show-error="$form.identifier?.invalid"
              label="Pseudo"
            >
              <InputText autocomplete="username" fluid name="identifier" />
            </LabelWithError>

            <LabelWithError
              :error="$form.password?.error?.message || responseError"
              :show-error="$form.password?.invalid || !!responseError"
              label="Mot de passe"
            >
              <Password
                :feedback="false"
                :input-props="{ autocomplete: 'current-password' }"
                fluid
                name="password"
                toggle-mask
              />
            </LabelWithError>

            <div class="flex items-center justify-between">
              <label class="flex items-center gap-3 text-sm/6 text-contrast">
                <Checkbox binary name="remember" />
                Se souvenir de moi
              </label>
            </div>

            <Button fluid type="submit">Se connecter</Button>
          </Form>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { z } from "zod";
import LabelWithError from "~/components/form/LabelWithError.vue";
import { NuxtLink } from "#components";
import type { ILoginBody } from "~/types/auth";
import { useAuthStore } from "~/store/authStore";
import type { FormSubmitEvent } from "@primevue/forms";

useSeoMeta({
  title: "Sign in",
  description: "Sign in to your account",
});
definePageMeta({
  middleware: "disconnected",
});

const initialValues = ref<ILoginBody>({
  identifier: "",
  password: "",
  remember: false,
});
const resolver = ref(
  zodResolver(
    z.object({
      identifier: z.string().nonempty(),
      password: z.string().min(8),
      remember: z.boolean(),
    }),
  ),
);

const responseError = ref<string | null>(null);

const onFormSubmit = (form: FormSubmitEvent) => {
  responseError.value = null;
  if (form.valid) {
    const authStore = useAuthStore();
    authStore.login(form.values as ILoginBody, {
      onResponseError: (error) => {
        responseError.value =
          error.response?._data?.data?.error || "An error occurred";
      },
    });
  }
};
</script>
