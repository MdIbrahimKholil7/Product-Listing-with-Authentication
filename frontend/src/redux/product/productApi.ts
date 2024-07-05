import apiSlice from "../app/apiSlice";

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProduct: builder.query<Record<string, unknown>[], unknown>({
      query: () => `/product/query`,
    }),
  }),
});

export default productApi;
