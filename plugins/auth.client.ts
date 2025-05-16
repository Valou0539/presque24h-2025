import { useAuthStore } from "~/store/authStore";

export default defineNuxtPlugin(() => {
  const authStore = useAuthStore();

  if (!authStore.token && authStore.refreshToken) {
    authStore.sessionRefreshToken = authStore.refreshToken;
    authStore.refresh();
  } else if (!authStore.token) {
    authStore.logout();
  }
});
