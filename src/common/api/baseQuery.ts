import {fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {RootState} from "../../store";

export const ProjBaseQuery = fetchBaseQuery({
    baseUrl: 'https://e03f-89-23-5-24.ngrok-free.app/api/',
    prepareHeaders: (headers, {getState}) => {
        const token = (getState() as RootState).auth.token;
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        headers.set('Content-Type', 'application/json');
        return headers;
    },
    timeout: 30000,
});
