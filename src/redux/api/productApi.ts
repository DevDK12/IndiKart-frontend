import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductsResponse } from "../../Types/apiTypes";


const server = import.meta.env.VITE_SERVER;

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/v1/product` }),
    endpoints: (builder) => ({
        latestProducts: builder.query<ProductsResponse, void>({
            query: () => 'latest',
        }),
        userProducts: builder.query<ProductsResponse, string>({
            query: (userId) => `admin-products/${userId}`,
        })
    })
})





export const { useLatestProductsQuery, useUserProductsQuery } = productApi;
