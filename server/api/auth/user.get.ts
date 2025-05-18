import { IRefreshBody } from "~/types/auth";

export default defineEventHandler(async (event): Promise<void> => {
  const { apiUrl } = useRuntimeConfig();

  const authorization = getHeader(event, "Authorization");
  if (!authorization) {
    throw new Error();
  }

  return $fetch(`${apiUrl}/auth/user`, {
    method: "GET",
    headers: {
      Authorization: authorization,
    },
  });
});
