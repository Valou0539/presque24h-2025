import { IPrime } from "~/types/prime";

export default defineEventHandler(async (event): Promise<IPrime> => {
  const { apiUrl } = useRuntimeConfig();

  const authorization = getHeader(event, "Authorization");
  if (!authorization) {
    throw new Error();
  }

  return $fetch<IChasse>(`${apiUrl}/prime/${event.context.params.id}`, {
    method: "DELETE",
    headers: {
      Authorization: authorization,
    },
  });
});
