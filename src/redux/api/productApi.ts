import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CategoriesResponse, createProductRequest, MesssageResponse, ProductDetailRequest, ProductsRequest, ProductsResponse, SearchProductsRequest, SearchProductsResponse, SingleProductRequest, UpdateProductRequest, UserProductRequest } from "../../Types/apiTypes";


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
        
        userProducts: builder.query<ProductsResponse, UserProductRequest>({
            query: ({userId, token}) => {
                return {
                    url: `admin-products/${userId}`,
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${token}`
                    },
                    method: 'GET'
                }
            },
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

        createProduct: builder.mutation<MesssageResponse, createProductRequest>({
            query: ({formData, token}) => {
                return {
                    url: 'new',
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `${token}`
                    }
                }
            },
            invalidatesTags: ['products'],
        }),

        singleProduct: builder.query<SingleProductRequest, ProductDetailRequest>({
            query: ({productId, token}) => {
                return {
                    url: productId,
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${token}`
                    },
                    method: 'GET'
                }
            },
            providesTags: ['products'],
        }),

        updateProduct: builder.mutation<MesssageResponse, UpdateProductRequest>({
            //_ Also include userId to verify authority to update
            query: ({formData, productId, token}) => {
                return {
                    url: productId,
                    method: 'PUT',
                    body: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `${token}`
                    }
                }
            },
            invalidatesTags: ['products', 'product'],
        }),

        deleteProduct: builder.mutation<MesssageResponse, ProductDetailRequest>({
            query: ({productId, token}) => {
                return {
                    url: productId,
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${token}`
                    }
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
