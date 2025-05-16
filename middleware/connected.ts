import { useAuthStore } from "~/store/authStore";

export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server) return;

  const { token } = useAuthStore();
  if (!token && to.path !== "/login") {
    return navigateTo("/login");
  }
});
