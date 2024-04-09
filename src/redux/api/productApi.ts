import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CategoriesResponse, MesssageResponse, ProductsRequest, ProductsResponse, SearchProductsRequest, SearchProductsResponse, SingleProductRequest, UpdateProductRequest } from "../../Types/apiTypes";


export const server = import.meta.env.VITE_SERVER;

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/v1/product` }),
    tagTypes: ['products', 'product'],
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
        }),

        singleProduct: builder.query<SingleProductRequest, string>({
            query: (productId) => productId,
            providesTags: ['products'],
        }),

        updateProduct: builder.mutation<MesssageResponse, UpdateProductRequest>({
            //_ Also include userId to verify authority to update
            query: ({formData, productId}) => {
                return {
                    url: productId,
                    method: 'PUT',
                    body: formData
                }
            },
            invalidatesTags: ['products', 'product'],
        }),

        deleteProduct: builder.mutation<MesssageResponse, string>({
            //_ Also include userId to verify authority to delete
            query: (productId) => {
                return {
                    url: productId,
                    method: 'DELETE',
                }
            },
            invalidatesTags: ['products'],
        }),
    }),
})





export const {
    useLatestProductsQuery,
    useUserProductsQuery,
    useSearchProductsQuery,
    useCategoriesQuery,
    useCreateProductMutation,
    useSingleProductQuery,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = productApi;
