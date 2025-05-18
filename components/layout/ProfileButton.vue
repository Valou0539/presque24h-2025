<template>
  <button
    aria-controls="overlay_menu"
    aria-haspopup="true"
    class="flex rounded-full focus:ring focus:ring-primary-500"
    @click="toggle"
  >
    <UserCircleIcon class="size-7" />
  </button>
  <Menu id="overlay_menu" class="bg-bg" ref="menu" :model="items" :popup="true">
    <template
      #item="{ item, props }: { item: MenuItem; props: MenuRouterBindProps }"
    >
      <NuxtLink v-if="item.to" v-slot="{ href, navigate }" :to="item.to" custom>
        <a v-ripple :href="href" v-bind="props.action" @click="navigate">
          <span :class="item.icon" />
          <span class="ml-2 leading-none">{{ item.label }}</span>
        </a>
      </NuxtLink>
      <a
        v-else
        v-ripple
        :href="item.url"
        :target="item.target"
        v-bind="props.action"
      >
        <span :class="item.icon" />
        <span class="ml-2 leading-none">{{ item.label }}</span>
      </a>
    </template>
  </Menu>
</template>

<script lang="ts" setup>
import { UserCircleIcon } from "@heroicons/vue/24/solid";
import type { MenuItem } from "primevue/menuitem";
import type { MenuRouterBindProps } from "primevue";
import { useAuthStore } from "~/store/authStore";

const menu = useTemplateRef("menu");
const items = ref<MenuItem[]>([]);

const toggle = (event: Event) => {
  menu.value?.toggle(event);
};

onMounted(() => {
  items.value = [
    {
      label: `${useAuthStore().user?.prenom} ${useAuthStore().user?.name}`,
      icon: "pi pi-user",
    },
    {
      separator: true,
    },
    {
      label: "Logout",
      icon: "pi pi-sign-out",
      command: useAuthStore().logout,
    },
  ];
});
</script>
