import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "./productApi";
import { CreateOrderRequest, MesssageResponse, MyOrderRequest, OrderDetailRequest, OrderDetailResponse, OrdersResponse } from "../../Types/apiTypes";



export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: fetchBaseQuery({baseUrl: `${server}/api/v1/order`}),
    tagTypes: ['orders', 'order'],
    endpoints: (builder) => ({
        createOrder : builder.mutation<MesssageResponse, CreateOrderRequest>({
            query: ({data, token}) => {
                return {
                    url: 'new',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${token}`
                    },
                    body: data,
                }
            },
            invalidatesTags: ['orders'],
        }),
        myOrders: builder.query<OrdersResponse, MyOrderRequest>({
            query: ({userId, token}) => {
                return {
                    url: `my-orders?userId=${userId}`,
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${token}`
                    },
                }

            },
            providesTags: ['orders'],
        }),
        allOrders: builder.query<OrdersResponse, string>({
            query: (token) => {
                return {
                    url: 'all',
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${token}`
                    },
                }
            },
            providesTags: ['orders'],
        }),
        orderDetail: builder.query<OrderDetailResponse, OrderDetailRequest>({
            query: ({orderId, token}) => {
                return {
                    url: `${orderId}`,
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${token}`
                    },
                }
            },
            providesTags: ['order'],
        }),
        
        
        //_ It should only invalidate specific order not all order from orders, so check back later
        deleteOrder: builder.mutation<MesssageResponse, OrderDetailRequest>({
            query: ({orderId, token}) => ({
                url: `${orderId}`,
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${token}`
                },
            }),
            invalidatesTags: ['orders'],
        }),

        //_ It should only invalidate specific order not all order from orders, so check back later
        processOrder: builder.mutation<MesssageResponse, OrderDetailRequest>({
            query: ({orderId, token}) => ({
                url: `${orderId}`,
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${token}`
                },
            }),
            invalidatesTags: ['orders', 'order'],
        }),

    }),
})



export const { 
    useCreateOrderMutation, 
    useMyOrdersQuery, 
    useAllOrdersQuery, 
    useOrderDetailQuery, 
    useDeleteOrderMutation, 
    useProcessOrderMutation, 
} = orderApi;
