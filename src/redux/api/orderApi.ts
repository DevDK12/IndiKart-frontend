import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "./productApi";
import { CreateOrderRequest, MesssageResponse, OrderDetailResponse, OrdersResponse } from "../../Types/apiTypes";



export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: fetchBaseQuery({baseUrl: `${server}/api/v1/order`}),
    tagTypes: ['orders', 'order'],
    endpoints: (builder) => ({
        createOrder : builder.mutation<MesssageResponse, CreateOrderRequest>({
            query: (data) => {
                return {
                    url: 'new',
                    method: 'POST',
                    body: data
                }
            },
            invalidatesTags: ['orders'],
        }),
        myOrders: builder.query<OrdersResponse, string>({
            query: (userId) => `my-orders?userId=${userId}`,
            providesTags: ['orders'],
        }),
        allOrders: builder.query<OrdersResponse, void>({
            query: () => 'all',
            providesTags: ['orders'],
        }),
        orderDetail: builder.query<OrderDetailResponse, string>({
            query: (orderId) => `${orderId}`,
            providesTags: ['order'],
        }),
        
        
        //_ It should only invalidate specific order not all order from orders, so check back later
        deleteOrder: builder.mutation<MesssageResponse, string>({
            query: (orderId) => ({
                url: `${orderId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['orders'],
        }),

        //_ It should only invalidate specific order not all order from orders, so check back later
        processOrder: builder.mutation<MesssageResponse, string>({
            query: (orderId) => ({
                url: `${orderId}`,
                method: 'PUT',
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
