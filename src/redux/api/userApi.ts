import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { server } from "../store";
import { AllUserResponse, DeleteUserRequest, LoginResponse, MesssageResponse, UserResponse } from "../../Types/apiTypes";
import { IRegisterUserApi, ILoginUserApi } from "../../Types/user-types";


const server = import.meta.env.VITE_SERVER;

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/v1/` }),
    tagTypes: ["users"],
    endpoints: (builder) => ({
        registerUser: builder.mutation<MesssageResponse, IRegisterUserApi>({
            query: (user) => ({
                url: "auth/register",
                method: "POST",
                body: user,
            }),
            invalidatesTags: ["users"],
        }),
        loginUser: builder.mutation<LoginResponse, ILoginUserApi>({
            query: (user) => ({
                url: "auth/login",
                method: "POST",
                body: user,
            }),
            invalidatesTags: ["users"],
        }),

        allUsers: builder.query<AllUserResponse, string>({
            query: (token) => ({
                url: "user/all",
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${token}`,
                }
            }),
            providesTags: ["users"],
        }),

        deleteUser: builder.mutation<MesssageResponse, DeleteUserRequest>({
            query: ({id, token}) => ({
                url: `user/${id}`,
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${token}`,
                }
            }),
            invalidatesTags: ["users"],
        })


    })

});



export const getSingleUser = async (id: string, token: string): Promise<UserResponse> => {
    const response = await fetch(`${server}/api/v1/user/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
        },
    });

    if(response.status === 401) throw new Error('Unauthorized , Sign in again');
    const data = await response.json();
    return data;
}





export const { useRegisterUserMutation, useLoginUserMutation, useAllUsersQuery , useDeleteUserMutation} = userApi;