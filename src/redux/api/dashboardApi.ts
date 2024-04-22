import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

import { server } from "./productApi";
import { BarResponse, LineResponse, PieResponse, StatsResponse } from "@/Types/apiTypes";



export const dashboardApi = createApi({
    reducerPath: 'dashboardApi',
    baseQuery: fetchBaseQuery({baseUrl: `${server}/api/v1/dashboard`}),
    endpoints: (builder) => ({
        dashboardStats: builder.query<StatsResponse, string>({
            query: (token) => {
                return {
                    url: 'stats',
                    headers: {
                        'Authorization': `${token}`
                    }
                }
            },
            keepUnusedDataFor: 0,
        }),
        pieStats: builder.query<PieResponse, string>({
            query: (token) => {
                return {
                    url: 'pie',
                    headers: {
                        'Authorization': `${token}`
                    }
                }
            },
            keepUnusedDataFor: 0,
        }),
        lineStats: builder.query<LineResponse, string>({
            query: (token) => {
                return {
                    url: 'line',
                    headers: {
                        'Authorization': `${token}`
                    }
                }
            },
            keepUnusedDataFor: 0,
        }),
        barStats: builder.query<BarResponse, string>({
            query: (token) => {
                return {
                    url: 'bar',
                    headers: {
                        'Authorization': `${token}`
                    }
                }
            },
            keepUnusedDataFor: 0,
        })
    })
})

export const {useDashboardStatsQuery, usePieStatsQuery, useLineStatsQuery, useBarStatsQuery } = dashboardApi;