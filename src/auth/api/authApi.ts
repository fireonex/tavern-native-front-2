import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {GetUserResponse, LoginRequest, LoginResponse, RegisterRequest, RegisterResponse} from "./types";


export const authApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://192.168.0.109:5000/api/users/',
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json');
            return headers;
        },
        timeout: 30000,
    }),
    endpoints: (builder) => ({
        loginUser: builder.mutation<LoginResponse, LoginRequest>({
            query: (credentials) => ({
                url: 'login',
                method: 'POST',
                body: credentials,
            }),
        }),

        registerUser: builder.mutation<RegisterResponse, RegisterRequest>({
            query: (userData) => ({
                url: 'register',
                method: 'POST',
                body: userData,
            }),
        }),

        getUser: builder.query<GetUserResponse, string>({
            query: (id) => ({
                url: `user/${id}`,
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
