import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { baseApiQuerySlice } from "./api/baseApiQuerySlice";
import { authApiQuerySlice } from "./api/authApiQuerySlice";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    //? gli diamo il nome dinamico con [apislice.reducerOath]
    // [apiSlice.reducerPath]: apiSlice.reducer,
    //# REDUCERS API REST
    api: baseApiQuerySlice.reducer,
    authApi: authApiQuerySlice.reducer,
    //# REDUCERS MODELLO
    auth: authReducer,
  },
  //? defaul middleware da concatenare, ma DOBBIAMO aggiungere anche apislice o altrimenti
  //? le opzioni della cache su cui basiamo tutta la logica, non verrebbero applicate
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(baseApiQuerySlice.middleware)
      .concat(authApiQuerySlice.middleware),
  devTools: false,
});

setupListeners(store.dispatch);
