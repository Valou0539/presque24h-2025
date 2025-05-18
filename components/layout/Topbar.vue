<template>
  <header
    :class="[
      'fixed top-0 left-0 z-10 w-full transition-colors duration-200',
      {
        'bg-bg-light/70 shadow-sm backdrop-blur-lg dark:bg-bg-dark/70 dark:shadow-white/10':
          showBackground || route.fullPath !== '/',
      },
    ]"
  >
    <nav
      aria-label="Global"
      class="mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-6 lg:px-8"
    >
      <div class="flex lg:flex-1">
        <NuxtLink class="-m-1.5 p-1.5" href="/">
          <span class="sr-only">{{ config.public.appName }}</span>
          <LogoIcon alt="" class="h-12 w-auto" />
        </NuxtLink>
      </div>
      <div class="hidden lg:flex lg:gap-x-12">
        <ClientOnly>
          <NuxtLink
            v-for="item in navigation"
            :key="item.name"
            :to="item.to"
            class="text-sm/6 font-semibold text-contrast"
            :class="{ hidden: item.needConnection && !authStore.token }"
          >
            {{ item.name }}
          </NuxtLink>
        </ClientOnly>
      </div>
      <div class="flex flex-1 items-center justify-end gap-x-4">
        <LayoutColorTheme />
        <ClientOnly>
          <div v-if="!authStore.token" class="flex gap-x-4">
            <Button :as="NuxtLink" severity="primary" to="/login"
              >Se connecter
            </Button>
          </div>
          <LayoutProfileButton v-else />
        </ClientOnly>
      </div>
      <div class="flex lg:hidden">
        <button
          class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-contrast"
          type="button"
          @click="mobileMenuOpen = true"
        >
          <span class="sr-only">Open main menu</span>
          <Bars3Icon aria-hidden="true" class="size-6" />
        </button>
      </div>
    </nav>
    <Drawer v-model:visible="mobileMenuOpen" blockScroll position="right">
      <template #header>
        <NuxtLink class="-m-1.5 p-1.5" to="/">
          <span class="sr-only">{{ config.public.appName }}</span>
          <LogoIcon alt="" class="h-8 w-auto" />
        </NuxtLink>
      </template>
      <div class="divide-y divide-low-contrast">
        <div class="space-y-2 pb-6">
          <ClientOnly>
            <NuxtLink
              v-for="item in navigation"
              :key="item.name"
              :to="item.to"
              class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-contrast hover:bg-low-contrast"
              :class="{
                hidden: item.needConnection && !authStore.token,
              }"
            >
              {{ item.name }}
            </NuxtLink>
          </ClientOnly>
        </div>
      </div>
    </Drawer>
  </header>
</template>

<script lang="ts" setup>
import { Bars3Icon } from "@heroicons/vue/24/outline";
import { NuxtLink } from "#components";
import { useAuthStore } from "~/store/authStore";

const config = useRuntimeConfig();

const navigation = [
  { name: "Monstres", to: "/monsters", needConnection: false },
  { name: "Disparus", to: "/missings", needConnection: false },
  { name: "Chasses", to: "/chasses", needConnection: true },
  { name: "Primes", to: "/primes", needConnection: true },
];

const authStore = useAuthStore();

const mobileMenuOpen = ref(false);
const showBackground = ref(false);

const route = useRoute();

const handleResize = () => {
  if (window.innerWidth > 1024) {
    mobileMenuOpen.value = false;
  }
};

const handleScroll = () => {
  showBackground.value = window.scrollY > 0;
};

watch(
  () => route.fullPath,
  () => (mobileMenuOpen.value = false),
);

onMounted(() => {
  window.addEventListener("resize", handleResize);
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
  window.removeEventListener("scroll", handleScroll);
});
</script>
