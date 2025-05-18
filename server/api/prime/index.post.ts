import { IPrime } from "~/types/prime";

export default defineEventHandler(async (event): Promise<void> => {
  const { apiUrl } = useRuntimeConfig();

  const body = await readBody<IPrime>(event);

  const authorization = getHeader(event, "Authorization");
  if (!authorization) {
    throw new Error();
  }

  return $fetch(`${apiUrl}/prime`, {
    method: "POST",
    body,
    headers: {
      Authorization: authorization,
    },
  });
});
