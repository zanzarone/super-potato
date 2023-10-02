import { baseApiQuerySlice } from "../../store/api/baseApiQuerySlice";
import { authApiQuerySlice } from "../../store/api/authApiQuerySlice";
import { setCredentials } from "./authSlice";

export const authApiSlice = authApiQuerySlice.injectEndpoints({
  endpoints: (builder) => ({
    //? POST - login
    login: builder.mutation({
      query: (credentials) => ({
        url: "/users/login",
        method: "POST",
        body: { ...credentials },
      }),
      extraOptions: { soka: 1 },
    }),
    //! COMPLETAMENTE FAKE, nel senso che json-server non gestisce refresh token, cosi
    //! faccio una nuova login, per aggiornare il token se scaduro
    refresh: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: { ...credentials },
      }),
      async onQueryStarted(arg, { dispatch, getState, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("madonna santa", data);
          const { accessToken, user } = data;
          console.log(user);
          dispatch(setCredentials({ user, accessToken }));
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useRefreshMutation } = authApiSlice;
