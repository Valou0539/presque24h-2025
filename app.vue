<template>
  <NuxtLoadingIndicator color="var(--color-primary)" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <Toast />
</template>
<script lang="ts" setup>
const config = useRuntimeConfig();
useHead({
  titleTemplate: `%s - ${config.public.appName}`,
});
</script>
