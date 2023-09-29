import { createSelector, createEntityAdapter, nanoid } from "@reduxjs/toolkit";
import { compareAsc, parseISO } from "date-fns";
//? importo la route per effettuare le request rest
import { baseApiQuerySlice } from "../../store/api/baseApiQuerySlice";
//? creo adapter con comparator per ritornare prima i prodotti ordinati in maniera ascendente per updatedAt
const productsAdapter = createEntityAdapter({
  sortComparer: (a, b) => {
    if (!b?.updatedAt || !a?.updatedAt) return 0;
    const aDate = parseISO(a.updatedAt);
    const bDate = parseISO(b.updatedAt);
    return compareAsc(aDate, bDate);
  },
});
//? Inizializzo lo stato
const initialState = productsAdapter.getInitialState([]);

//? sono pronto per creare le actions(endpoints route) per il modello
export const productsApiSlice = baseApiQuerySlice.injectEndpoints({
  endpoints: (builder) => ({
    //# GET - tutti i prodotti - /products
    getProducts: builder.query({
      query: () => "/products",
      extraOptions: () => ({
        myOption: "Test Option",
      }),
      transformResponse: (responseData) => {
        //? normalizzo il json. la risposta presa dalle API ha id ma e' mappato come _id per via di mongo
        const fetchedProducts = responseData.map((prod) => {
          if (!prod.id) prod.id = prod._id;
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
    //# POST - nuovo prodotto - /products
    addNewProduct: builder.mutation({
      query: (initialProd) => {
        const date = new Date().toISOString();
        return {
          url: "/products",
          method: "POST",
          body: {
            ...initialProd,
            //? solo per ora, dopo la post VERA non ha bisogno di avere id settato!
            id: Date.now(),
            _id: nanoid(),
            security: 1,
            createdAt: date,
            updatedAt: date,
          },
        };
      },
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),
    //# PUT - aggiornare tutto il record del prodotto - /products/${initialProd.id}
    updateProduct: builder.mutation({
      query: (initialProd) => {
        console.log(
          "PUT - aggiornare tutto il record del prodotto -",
          initialProd
        );
        return {
          url: `/products/${initialProd.id}`,
          method: "PUT",
          body: {
            ...initialProd,
            //? solo per ora, dopo la post VERA non ha bisogno di avere id settato!
            updatedAt: new Date().toISOString(),
          },
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: "Product", id: arg.id },
      ],
    }),
    //# DELETE - aggiornare tutto il record del prodotto - /products/${initialProd.id}
    deleteProduct: builder.mutation({
      query: ({ id }) => ({
        url: `/products/${id}`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Product", id: arg.id },
      ],
    }),
    updateProductStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        // In a real app, we'd probably need to base this on user ID somehow
        // so that a user can't do the same reaction more than once
        body: { status },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Product", id: arg.id },
      ],
      // async onQueryStarted(
      //   { postId, reactions },
      //   { dispatch, queryFulfilled }
      // ) {
      //   // `updateQueryData` requires the endpoint name and cache key arguments,
      //   // so it knows which piece of cache state to update
      //   const patchResult = dispatch(
      //     extendedApiSlice.util.updateQueryData(
      //       "getPosts",
      //       undefined,
      //       (draft) => {
      //         // The `draft` is Immer-wrapped and can be "mutated" like in createSlice
      //         const post = draft.entities[postId];
      //         if (post) post.reactions = reactions;
      //       }
      //     )
      //   );
      //   try {
      //     await queryFulfilled;
      //   } catch {
      //     patchResult.undo();
      //   }
      // },
    }),
  }),
});

//? esporto il custom hook per poter chiamare le api dai controllers
export const {
  useGetProductsQuery,
  useAddNewProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useUpdateProductStatusMutation,
} = productsApiSlice;

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
