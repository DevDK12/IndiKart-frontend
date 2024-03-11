import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./api/userApi";
import { userSlice } from  "./reducer/user-slice";
import { productApi } from "./api/productApi";




export const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        [userSlice.reducerPath]: userSlice.reducer,
        [productApi.reducerPath]: productApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        userApi.middleware,
        productApi.middleware,
    ),
});



