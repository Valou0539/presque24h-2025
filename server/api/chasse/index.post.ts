import { IChasse } from "~/types/chasse";

export default defineEventHandler(async (event): Promise<void> => {
  const { apiUrl } = useRuntimeConfig();

  const body = await readBody<IChasse>(event);

  const authorization = getHeader(event, "Authorization");
  if (!authorization) {
    throw new Error();
  }

  return $fetch(`${apiUrl}/chasse`, {
    method: "POST",
    body,
    headers: {
      Authorization: authorization,
    },
  });
});
