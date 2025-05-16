import { ILoginBody } from "~/types/auth";

export default defineEventHandler(async (event): Promise<void> => {
  const { apiUrl } = useRuntimeConfig();
  const body = await readBody<ILoginBody>(event);

  return $fetch(`${apiUrl}/auth/login`, {
    method: "POST",
    body,
  });
});
