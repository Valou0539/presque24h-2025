<template>
  <NuxtLoadingIndicator color="var(--color-primary)" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <Toast />
</template>
<script lang="ts" setup>
useHead({
  titleTemplate: "%s - Winalia",
});
</script>
