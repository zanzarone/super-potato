import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "../features/api/apiSlice";

export const store = configureStore({
  reducer: {
    //? gli diamo il nome dinamico con [apislice.reducerOath]
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  //? defaul middleware da concatenare, ma DOBBIAMO aggiungere anche apislice o altrimenti
  //? le opzioni della cache su cui basiamo tutta la logica, non verrebbero applicate
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: false,
});

setupListeners(store.dispatch);
