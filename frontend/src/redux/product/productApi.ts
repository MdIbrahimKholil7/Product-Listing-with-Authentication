import { IProduct } from "../../interface/productInterface";
import apiSlice from "../app/apiSlice";

interface Product {
  message: string;
  success: boolean;
  data: IProduct[];
}
export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProduct: builder.query<Product, unknown>({
      query: ({ query }: { query: string }) => {
        const isValidQuery =
          typeof query === "string" && query.trim().length > 0;
        return isValidQuery
          ? `/product/query?query=${query}`
          : "/product/query";
      },
    }),
  }),
});

export default productApi;
