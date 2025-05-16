<template>
  <main class="background pt-20">
    <section
      class="mx-auto min-h-[calc(100vh-8rem)] max-w-sm space-y-8 px-6 pt-12 pb-24 lg:px-8"
    >
      <div>
        <h2
          class="mt-24 text-2xl/9 font-bold tracking-tight text-contrast lg:mt-32"
        >
          Verify your email address
        </h2>
        <p class="mt-2 text-sm/6 text-gray">
          We have sent an email with the code to
          <span class="font-semibold">{{ email }}</span>
        </p>
      </div>
      <form @submit.prevent="onFormSubmit">
        <LabelWithError
          :error="responseErrors.code?.[0]"
          :show-error="!!responseErrors.code"
          label=""
        >
          <InputOtp v-model="code" :length="6" integer-only name="code" />
        </LabelWithError>
        <div class="mt-4 flex items-center gap-4">
          <Button type="submit"> Verify</Button>
          <Button severity="secondary" text @click="resendVerificationEmail">
            Resend the code
          </Button>
        </div>
      </form>
    </section>
  </main>
</template>

<script lang="ts" setup>
import { useAuthStore } from "~/store/authStore";
import type { IVerifyEmailBody } from "~/types/auth";
import type { ResponseError } from "~/types/api";
import LabelWithError from "~/components/form/LabelWithError.vue";

useSeoMeta({
  title: "Verify Email",
  description:
    "Verify your email address to start earning money while playing Fortnite.",
});
definePageMeta({
  middleware: [
    "disconnected",
    (to) => {
      const email = to.query.email as string;
      if (
        !email ||
        !RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).test(email)
      ) {
        return abortNavigation();
      }
    },
  ],
});

const email = useRoute().query.email as string;
const code = ref("");
const toast = useToast();
const responseErrors = ref<ResponseError<IVerifyEmailBody>>({});

const onFormSubmit = () => {
  responseErrors.value = {};
  if (code && code.value.length === 6) {
    const authStore = useAuthStore();
    authStore.verifyEmail(
      {
        email,
        code: code.value,
      },
      {
        onResponseError: (error) => {
          responseErrors.value.code = [
            error.response?._data?.data?.error || "An error occurred",
          ];
        },
      },
    );
  } else {
    responseErrors.value.code = ["Code must be 6 characters long"];
  }
};

const resendVerificationEmail = () => {
  const authStore = useAuthStore();
  authStore
    .resendVerificationEmail(
      { email },
      {
        onResponseError: (error) => {
          toast.add({
            severity: "error",
            summary: "Error",
            detail: error.response?._data?.data?.error || "An error occurred",
            life: 5000,
          });
        },
      },
    )
    .then(() => {
      toast.add({
        severity: "success",
        summary: "Email sent",
        detail: "We have sent a new verification code to your email",
        life: 5000,
      });
    });
};
</script>
