import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CreateCharacterRequest, CreateCharacterResponse } from './types';
import {RootState} from "../../store";
import {Character} from "../../common/types";

export const characterApi = createApi({
    reducerPath: 'characterApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://192.168.0.109:5000/api/',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            headers.set('Content-Type', 'application/json');
            return headers;
        },
        timeout: 30000,
    }),
    endpoints: (builder) => ({
        createCharacter: builder.mutation<CreateCharacterResponse, CreateCharacterRequest>({
            query: (characterData) => ({
                url: 'characters',
                method: 'POST',
                body: characterData,
            }),
        }),
        getCharacters: builder.query<Character[], void>({
            query: () => 'characters',
        }),
    }),
});

export const { useCreateCharacterMutation, useGetCharactersQuery } = characterApi;
