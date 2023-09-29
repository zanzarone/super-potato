import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApiQuerySlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3500" }),
  tagTypes: ["Users", "Products"],
  endpoints: (builder) => ({}),
});
