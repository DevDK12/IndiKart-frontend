import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CategoriesResponse, MesssageResponse, ProductsRequest, ProductsResponse, SearchProductsRequest, SearchProductsResponse } from "../../Types/apiTypes";


const server = import.meta.env.VITE_SERVER;

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/v1/product` }),
    tagTypes: ['products'],
    endpoints: (builder) => ({
        latestProducts: builder.query<ProductsResponse, ProductsRequest>({
            query: ({productsPerPage}) => `latest?product_per_page=${productsPerPage}`,
            providesTags: ['products'],
        }),
        
        userProducts: builder.query<ProductsResponse, string>({
            query: (userId) => `admin-products/${userId}`,
            providesTags: ['products'],
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
            providesTags: ['products'],
        }),
        categories: builder.query<CategoriesResponse, void>({
            query: () => `categories`,
            providesTags: ['products'],
        }),

        createProduct: builder.mutation<MesssageResponse, FormData>({
            query: (formData) => {
                return {
                    url: 'new',
                    method: 'POST',
                    body: formData
                }
            },
            invalidatesTags: ['products'],
        })
    })
})





export const {
    useLatestProductsQuery,
    useUserProductsQuery,
    useSearchProductsQuery,
    useCategoriesQuery,
    useCreateProductMutation,
} = productApi;
