<template>
  <footer class="pt-12 pb-6">
    <div class="container mx-auto px-4">
      <div class="text-center text-sm text-gray">
        &copy; {{ new Date().getFullYear() }} {{ config.public.appName }} - Tous
        droits réservés
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();
</script>
