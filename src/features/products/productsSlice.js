import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
// import { sub } from "date-fns";
//? importo la route per effettuare le request rest
import { apiSlice } from "../api/apiSlice";
//? creo adapter
const productsAdapter = createEntityAdapter();
//? vediamo se c'e' necessita' di ordinarlo
// createEntityAdapter({
//     sortComparer: (a, b) => b.date.localeCompare(a.date)
// })
//? Inizializzo lo stato
const initialState = productsAdapter.getInitialState([]);

//? sono pronto per creare le actions(endpoints route) per il modello
export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //# GET /products
    getProducts: builder.query({
      query: () => "/products",
      transformResponse: (responseData) => {
        //? normalizzo il json. la risposta presa dalle API ha id ma e' mappato come _id per via di mongo
        const fetchedProducts = responseData.map((prod) => {
          prod.id = prod._id;
          return prod;
        });
        return productsAdapter.setAll(initialState, fetchedProducts);
      },
      providesTags: (result, error, arg) => {
        let tags = [{ type: "Product", id: "LIST" }];
        if (result?.ids && !error) {
          tags.push(...result.ids.map((id) => ({ type: "Product", id })));
        }
        return tags;
      },
    }),
  }),
});

//? esporto il custom hook per poter chiamare le api dai controllers
export const { useGetProductsQuery } = productsApiSlice;

//? Non esegue la query, prende solo il risultato
const selectProductResult = productsApiSlice.endpoints.getProducts.select();

//? Creiamo il selettore memorizzato per efficienza
//? Ritorniamo poi l'ogetto vero, non tutto il modello che conterrebbe anche cose non necessarie
//? tipo i reducers
const selectProductData = createSelector(
  selectProductResult,
  (productsResult) => productsResult.data
);

//? adesso possiamo esportare i selettori del modello
export const {
  selectAll: selectAllProducts,
  selectById: selectProductById,
  selectIds: selectProductIds,
  //? se il modello non e' pronto ritorniamo lo stato iniziale
} = productsAdapter.getSelectors(
  (state) => selectProductData(state) ?? initialState
);
