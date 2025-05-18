import { useAuthStore } from "~/store/authStore";

export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server) return;

  const { user } = useAuthStore();
  if (user?.role !== "Admin" && to.path !== "/") {
    return navigateTo("/");
  }
});
