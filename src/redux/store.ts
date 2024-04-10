import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./api/userApi";
import { userSlice } from  "./reducer/user-slice";
import { productApi } from "./api/productApi";
import { cartSlice } from "./reducer/cart-slice";
import { orderApi } from "./api/orderApi";




export const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        [userSlice.reducerPath]: userSlice.reducer,
        [productApi.reducerPath]: productApi.reducer,
        [cartSlice.reducerPath]: cartSlice.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        userApi.middleware,
        productApi.middleware,
        orderApi.middleware,
    ),
});



