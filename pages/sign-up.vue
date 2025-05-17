<template>
  <main class="background flex min-h-screen flex-1 px-4 py-20">
    <div class="mx-auto w-full max-w-sm duration-300 lg:w-96 xl:transition-all">
      <div>
        <h2
          class="mt-24 text-2xl/9 font-bold tracking-tight text-contrast lg:mt-32"
        >
          Create an account
        </h2>
        <p class="mt-2 text-sm/6 text-gray">
          Already a member?
          {{ " " }}
          <NuxtLink
            class="font-semibold text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
            to="/login"
          >
            Sign in now
          </NuxtLink>
        </p>
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
              :error="$form.name?.error?.message || responseErrors.name?.[0]"
              :show-error="$form.name?.invalid || !!responseErrors.name"
              label="Username"
            >
              <InputText autocomplete="username" fluid name="name" />
            </LabelWithError>

            <LabelWithError
              :error="$form.email?.error?.message || responseErrors.email?.[0]"
              :show-error="$form.email?.invalid || !!responseErrors.email"
              label="Email"
            >
              <InputText autocomplete="email" fluid name="email" />
            </LabelWithError>

            <LabelWithError
              :error="
                $form.password?.error?.message || responseErrors.password?.[0]
              "
              :show-error="$form.password?.invalid || !!responseErrors.password"
              label="Password"
            >
              <Password
                :feedback="false"
                :input-props="{ autocomplete: 'new-password' }"
                autocomplete="current-password"
                fluid
                name="password"
                toggle-mask
              />
            </LabelWithError>

            <div>
              <label class="flex items-center gap-3 text-sm/6 text-contrast">
                <Checkbox binary name="consent" />
                <span>
                  I agree to the
                  <NuxtLink
                    class="font-semibold text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
                    to="#"
                  >
                    Terms of Service
                  </NuxtLink>
                </span>
              </label>
              <Message
                v-if="$form.consent?.invalid"
                severity="error"
                size="small"
                variant="simple"
              >
                {{ $form.consent?.error.message }}
              </Message>
            </div>

            <Button fluid type="submit"> Sign in</Button>
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
import type { IRegisterBody } from "~/types/auth";
import { useAuthStore } from "~/store/authStore";
import type { FormSubmitEvent } from "@primevue/forms";
import type { ResponseError } from "~/types/api";

useSeoMeta({
  title: "Create an account",
  description:
    "Create an account to start earning money while playing Fortnite",
});
definePageMeta({
  middleware: "disconnected",
});

const initialValues = ref<IRegisterBody>({
  name: "",
  email: "",
  password: "",
  consent: false,
});
const resolver = ref(
  zodResolver(
    z.object({
      name: z.string().nonempty({ message: "Username is required" }),
      email: z.string().nonempty({ message: "Email is required" }).email(),
      password: z.string().min(8),
      consent: z.literal(true, {
        errorMap: () => {
          return { message: "You must agree to the terms" };
        },
      }),
    }),
  ),
);

const responseErrors = ref<ResponseError<IRegisterBody>>({});

const onFormSubmit = (form: FormSubmitEvent) => {
  responseErrors.value = {};
  if (form.valid) {
    const authStore = useAuthStore();
    authStore.register(form.values as IRegisterBody, {
      onResponseError: (error) => {
        responseErrors.value = error.response?._data.data.errors || {};
      },
    });
  }
};
</script>
