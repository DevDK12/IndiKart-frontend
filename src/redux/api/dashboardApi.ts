import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

import { server } from "./productApi";
import { BarResponse, LineResponse, PieResponse, StatsResponse } from "@/Types/apiTypes";



export const dashboardApi = createApi({
    reducerPath: 'dashboardApi',
    baseQuery: fetchBaseQuery({baseUrl: `${server}/api/v1/dashboard`}),
    endpoints: (builder) => ({
        dashboardStats: builder.query<StatsResponse, void>({
            query: () => 'stats',
        }),
        pieStats: builder.query<PieResponse, void>({
            query: () => 'pie',
        }),
        lineStats: builder.query<LineResponse, void>({
            query: () => 'line',
        }),
        barStats: builder.query<BarResponse, void>({
            query: () => 'bar',
        })
    })
})

export const {useDashboardStatsQuery, usePieStatsQuery, useLineStatsQuery, useBarStatsQuery } = dashboardApi;