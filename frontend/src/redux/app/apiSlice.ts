// Need to use the React-specific entry point to allow generating React hooks
import { SerializedError } from "@reduxjs/toolkit";
import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

// Define a union type for potential error responses
type MyError = FetchBaseQueryError | SerializedError;
// Define a service using a base URL and expected endpoints
const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",

    prepareHeaders: async (headers, { getState }: Record<string, any>) => {
      const token =
        getState()?.auth?.token || JSON.parse(localStorage.getItem("token"));

      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: () => ({}),
});
export default apiSlice;
// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
