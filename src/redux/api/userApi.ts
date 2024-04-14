import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { server } from "../store";
import { AllUserResponse, MesssageResponse, UserResponse } from "../../Types/apiTypes";
import { IRegisterUserApi, ILoginUserApi } from "../../Types/user-types";


const server = import.meta.env.VITE_SERVER;

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/v1/user` }),
    tagTypes: ["users"],
    endpoints: (builder) => ({
        registerUser: builder.mutation<MesssageResponse, IRegisterUserApi>({
            query: (user) => ({
                url: "register",
                method: "POST",
                body: user,
            }),
            invalidatesTags: ["users"],
        }),
        loginUser: builder.mutation<MesssageResponse, ILoginUserApi>({
            query: (user) => ({
                url: "login",
                method: "POST",
                body: user,
            }),
            invalidatesTags: ["users"],
        }),

        allUsers: builder.query<AllUserResponse, void>({
            query: () => "all",
            providesTags: ["users"],
        }),

        deleteUser: builder.mutation<MesssageResponse, string>({
            query: (id) => ({
                url: `${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["users"],
        })


    })

});



export const getSingleUser = async (id: string): Promise<UserResponse> => {
    const response = await fetch(`${server}/api/v1/user/${id}`);
    const data = await response.json();
    return data;
}





export const { useRegisterUserMutation, useLoginUserMutation, useAllUsersQuery , useDeleteUserMutation} = userApi;