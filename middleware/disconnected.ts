import { useAuthStore } from "~/store/authStore";

export default defineNuxtRouteMiddleware(async () => {
  if (import.meta.server) return;

  const { token } = useAuthStore();
  if (token) {
    return abortNavigation();
  }
});
