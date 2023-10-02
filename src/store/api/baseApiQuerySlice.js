import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApiQuerySlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3500" }),
  // baseQuery: fetchBaseQuery({ baseUrl: "https://api.srmservice.com/v1" }),
  tagTypes: ["Users", "Products"],
  endpoints: (builder) => ({}),
});
