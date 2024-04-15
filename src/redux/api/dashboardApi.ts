import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

import { server } from "./productApi";
import { BarResponse, LineResponse, PieResponse, StatsResponse } from "@/Types/apiTypes";



export const dashboardApi = createApi({
    reducerPath: 'dashboardApi',
    baseQuery: fetchBaseQuery({baseUrl: `${server}/api/v1/dashboard`}),
    endpoints: (builder) => ({
        dashboardStats: builder.query<StatsResponse, void>({
            query: () => 'stats',
            keepUnusedDataFor: 0,
        }),
        pieStats: builder.query<PieResponse, void>({
            query: () => 'pie',
            keepUnusedDataFor: 0,
        }),
        lineStats: builder.query<LineResponse, void>({
            query: () => 'line',
            keepUnusedDataFor: 0,
        }),
        barStats: builder.query<BarResponse, void>({
            query: () => 'bar',
            keepUnusedDataFor: 0,
        })
    })
})

export const {useDashboardStatsQuery, usePieStatsQuery, useLineStatsQuery, useBarStatsQuery } = dashboardApi;