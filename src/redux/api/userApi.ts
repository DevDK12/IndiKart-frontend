import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { server } from "../store";
import { MesssageResponse, UserResponse } from "../../Types/apiTypes";
import { IRegisterUserApi, ILoginUserApi } from "../../Types/user-types";


const server = import.meta.env.VITE_SERVER;

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/v1/user` }),
    endpoints: (builder) => ({
        registerUser: builder.mutation<MesssageResponse, IRegisterUserApi>({
            query: (user) => ({
                url: "register",
                method: "POST",
                body: user,
            })
        }),
        loginUser: builder.mutation<MesssageResponse, ILoginUserApi>({
            query: (user) => ({
                url: "login",
                method: "POST",
                body: user,
            })
        }),

        allUsers: builder.query({
            query: () => "all"
        })
    })

});



export const getSingleUser = async (id: string): Promise<UserResponse> => {
    const response = await fetch(`${server}/api/v1/user/${id}`);
    const data = await response.json();
    return data;
}


export const { useRegisterUserMutation, useLoginUserMutation, useAllUsersQuery } = userApi;