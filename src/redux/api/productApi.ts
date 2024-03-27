import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CategoriesResponse, ProductsResponse, SearchProductsRequest, SearchProductsResponse } from "../../Types/apiTypes";


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
        }),
        searchProducts: builder.query<SearchProductsResponse, SearchProductsRequest>({
            query: ({ category, page, price, search, sort, productsPerPage }) => {
                let base = `all?search=${search}&page=${page}`;
                if(category) base += `&category=${category}`;
                if(price) base += `&price=${price}`;
                if(sort) base += `&sort=${sort}`;
                if(productsPerPage) base += `&product_per_page=${productsPerPage}`;

                return base;
            },
        }),
        categories: builder.query<CategoriesResponse, void>({
            query: () => `categories`,
        }),
    })
})





export const {
    useLatestProductsQuery,
    useUserProductsQuery,
    useSearchProductsQuery,
    useCategoriesQuery,
} = productApi;
