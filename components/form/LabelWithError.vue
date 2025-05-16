<template>
  <label class="block">
    <span class="mb-2 block text-sm/6 font-medium text-contrast">{{
      label
    }}</span>
    <span class="mt-2">
      <slot />
      <Message
        v-if="!showError && !!hint"
        severity="secondary"
        size="small"
        variant="simple"
      >
        {{ hint }}
      </Message>
      <Message
        v-if="!!showError"
        severity="error"
        size="small"
        variant="simple"
      >
        {{ error }}
      </Message>
    </span>
  </label>
</template>

<script lang="ts" setup>
defineProps<{
  label: string;
  showError?: boolean;
  error?: string;
  hint?: string;
}>();
</script>
