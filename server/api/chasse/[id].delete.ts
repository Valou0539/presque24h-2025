import { IChasse } from "~/types/chasse";

export default defineEventHandler(async (event): Promise<IChasse> => {
  const { apiUrl } = useRuntimeConfig();

  const authorization = getHeader(event, "Authorization");
  if (!authorization) {
    throw new Error();
  }

  return $fetch<IChasse>(`${apiUrl}/chasse/${event.context.params.id}`, {
    method: "DELETE",
    headers: {
      Authorization: authorization,
    },
  });
});
