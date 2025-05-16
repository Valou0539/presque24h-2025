import type { IUser } from "~/types/user";
import type {
  ILoginBody,
  IRegisterBody,
  IResendVerificationEmailBody,
  ITokenResponse,
  IVerifyEmailBody,
} from "~/types/auth";
import type { NitroFetchOptions, NitroFetchRequest } from "nitropack";

type CustomFetch = <T = any>(
  request: Parameters<typeof $fetch>[0],
  config?: Parameters<typeof $fetch>[1],
  alreadyRefresh?: boolean,
) => ReturnType<typeof $fetch<T>>;

export const useAuthStore = defineStore(
  "auth",
  () => {
    const token = ref<string | null>(null);
    const sessionRefreshToken = ref<string | null>(null);
    const refreshToken = ref<string | null>(null);
    const redirect = ref<string | null>(null);
    const user = ref<IUser | null>(null);

    const fetch: CustomFetch = async (request, config, alreadyRefresh) => {
      return $fetch(request, {
        ...config,
        headers: {
          ...config?.headers,
          Authorization: `Bearer ${token.value}`,
        },
        onResponseError: [
          async (error) => {
            if (
              error.response?.status === 401 &&
              sessionRefreshToken.value &&
              !alreadyRefresh
            ) {
              await refresh({
                onResponse: (response) => {
                  if (response.response.status === 200) {
                    return fetch(request, config, true);
                  }
                },
              });
            }
          },
          ...(Array.isArray(config?.onResponseError)
            ? config?.onResponseError
            : [config?.onResponseError || (() => {})]),
        ],
      });
    };

    const register = async (
      registerBody: IRegisterBody,
      config?: NitroFetchOptions<NitroFetchRequest>,
    ): ReturnType<typeof $fetch> => {
      return $fetch("/api/auth/create", {
        ...config,
        method: "POST",
        body: registerBody,
      }).then(() => {
        navigateTo(`/verify-email?email=${registerBody.email}`);
      });
    };

    const verifyEmail = async (
      verifyEmailBody: IVerifyEmailBody,
      config?: NitroFetchOptions<NitroFetchRequest>,
    ): ReturnType<typeof $fetch> => {
      return $fetch("/api/auth/verify-email", {
        ...config,
        method: "PATCH",
        body: verifyEmailBody,
      }).then(() => {
        navigateTo("/login");
      });
    };

    const resendVerificationEmail = async (
      verifyEmailBody: IResendVerificationEmailBody,
      config?: NitroFetchOptions<NitroFetchRequest>,
    ): ReturnType<typeof $fetch> => {
      return $fetch("/api/auth/resend-verification-email", {
        ...config,
        method: "POST",
        body: verifyEmailBody,
      });
    };

    const login = async (
      loginBody: ILoginBody,
      config?: NitroFetchOptions<NitroFetchRequest>,
    ): ReturnType<typeof $fetch<void | ITokenResponse>> => {
      return $fetch<ITokenResponse>("/api/auth/login", {
        ...config,
        method: "POST",
        body: loginBody,
        onResponseError: [
          (error) => {
            if (error.response.status === 403) {
              navigateTo(
                `/verify-email?email=${error.response._data.data.email}`,
              );
            }
          },
          ...(Array.isArray(config?.onResponseError)
            ? config?.onResponseError
            : [config?.onResponseError || (() => {})]),
        ],
      }).then((response: ITokenResponse) => {
        token.value = response.access_token;
        sessionRefreshToken.value = response.refresh_token;
        if (loginBody.remember) {
          refreshToken.value = response.refresh_token;
        }
        navigateTo(redirect.value || "/");
      });
    };

    const refresh = async (
      config?: NitroFetchOptions<NitroFetchRequest>,
    ): ReturnType<typeof $fetch<void | ITokenResponse>> => {
      return $fetch<ITokenResponse>("/api/auth/refresh", {
        ...config,
        method: "POST",
        headers: {
          Authorization: `Bearer ${sessionRefreshToken.value}`,
        },
        body: {
          refresh_token: sessionRefreshToken.value,
        },
        onResponse: [
          (response) => {
            if (response.response.status === 200) {
              token.value = response.response._data.access_token;
              sessionRefreshToken.value = response.response._data.refresh_token;
              refreshToken.value = response.response._data.refresh_token;
            }
          },
          ...(Array.isArray(config?.onResponse)
            ? config?.onResponse
            : [config?.onResponse || (() => {})]),
        ],
        onResponseError: [
          () => {
            token.value = null;
            logout();
          },
          ...(Array.isArray(config?.onResponseError)
            ? config?.onResponseError
            : [config?.onResponseError || (() => {})]),
        ],
      });
    };

    const logout = () => {
      const deleteDataAndRedirect = () => {
        token.value = null;
        sessionRefreshToken.value = null;
        refreshToken.value = null;
        user.value = null;
        redirect.value = useRoute().path !== "/login" ? useRoute().path : "/";
        navigateTo("/login");
      };
      if (!token.value) deleteDataAndRedirect();
      else
        fetch("/api/auth/logout", {
          method: "POST",
        }).finally(() => {
          deleteDataAndRedirect();
        });
    };

    return {
      token,
      sessionRefreshToken,
      refreshToken,
      user,
      fetch,
      register,
      verifyEmail,
      resendVerificationEmail,
      login,
      refresh,
      logout,
    };
  },
  {
    persist: [
      {
        storage: piniaPluginPersistedstate.sessionStorage(),
        pick: ["token", "sessionRefreshToken", "user"],
      },
      {
        storage: piniaPluginPersistedstate.localStorage(),
        pick: ["refreshToken"],
      },
    ],
  },
);
