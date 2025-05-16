import { IRefreshBody } from "~/types/auth";

export default defineEventHandler(async (event): Promise<void> => {
  const { apiUrl } = useRuntimeConfig();

  const body = await readBody<IRefreshBody>(event);

  const authorization = getHeader(event, "Authorization");
  if (!authorization) {
    throw new Error();
  }

  return $fetch(`${apiUrl}/auth/refresh`, {
    method: "POST",
    body,
    headers: {
      Authorization: authorization,
    },
  });
});
