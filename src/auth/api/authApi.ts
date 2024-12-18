import {createApi} from '@reduxjs/toolkit/query/react';
import {GetUserResponse, LoginRequest, LoginResponse, RegisterRequest, RegisterResponse} from "./types";
import {ProjBaseQuery} from "../../common/api/baseQuery";


export const authApi = createApi({
    reducerPath: 'userApi',
    baseQuery: ProjBaseQuery,
    endpoints: (builder) => ({
        loginUser: builder.mutation<LoginResponse, LoginRequest>({
            query: (credentials) => ({
                url: 'users/login',
                method: 'POST',
                body: credentials,
            }),
        }),

        registerUser: builder.mutation<RegisterResponse, RegisterRequest>({
            query: (userData) => ({
                url: 'users/register',
                method: 'POST',
                body: userData,
            }),
        }),

        getUser: builder.query<GetUserResponse, string>({
            query: (id) => ({
                url: `users/user/${id}`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${id}`,
                },
            }),
        }),
    }),
});

export const {
    useLoginUserMutation,
    useRegisterUserMutation,
    useGetUserQuery,
} = authApi;
