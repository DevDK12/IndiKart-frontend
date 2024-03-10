import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./api/userApi";
import { userSlice } from  "./reducer/user-slice";




export const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        [userSlice.reducerPath]: userSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware),
});



