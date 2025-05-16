export type ResponseError<RequestBody extends Record<string, any>> = Partial<
  Record<keyof RequestBody, string[]>
> & {
  globalError?: string;
};
