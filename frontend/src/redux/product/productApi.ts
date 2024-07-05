import apiSlice from "../app/apiSlice";

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProduct: builder.query<Record<string, unknown>[], unknown>({
      query: ({ query }: { query: string }) => {
        const isValidQuery =
          typeof query === "string" && query.trim().length > 0;
        return isValidQuery
          ? `/product/query?query=${query}`
          : "/product/query"; // Return an empty string or handle accordingly
      },
    }),
  }),
});

export default productApi;
