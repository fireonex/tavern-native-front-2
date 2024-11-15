import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {
    CreateCharacterRequest,
    CreateCharacterResponse,
    UpdateCharacterRequest,
    UpdateCharacterResponse
} from './types';
import {RootState} from "../../store";
import {Character} from "../../common/types";

export const characterApi = createApi({
    reducerPath: 'characterApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://192.168.0.109:5000/api/',
        prepareHeaders: (headers, {getState}) => {
            const token = (getState() as RootState).auth.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            headers.set('Content-Type', 'application/json');
            return headers;
        },
        timeout: 30000,
    }),
    tagTypes: ['Character'],
    endpoints: (builder) => ({
        createCharacter: builder.mutation<CreateCharacterResponse, CreateCharacterRequest>({
            query: (characterData) => ({
                url: 'characters',
                method: 'POST',
                body: characterData,
            }),
            invalidatesTags: [{type: 'Character', id: 'LIST'}],
        }),
        getCharacters: builder.query<Character[], void>({
            query: () => 'characters',
            providesTags: [{type: 'Character', id: 'LIST'}],
        }),
        deleteCharacter: builder.mutation<void, string>({
            query: (characterId) => ({
                url: `characters/${characterId}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{type: 'Character', id: 'LIST'}],
        }),
        updateCharacter: builder.mutation<UpdateCharacterResponse, { characterId: string; characterData: UpdateCharacterRequest }>({
            query: ({ characterId, characterData }) => ({
                url: `characters/${characterId}`,
                method: 'PUT',
                body: characterData,
            }),
            invalidatesTags: [{ type: 'Character', id: 'LIST' }],
        }),
    }),
});

export const {
    useCreateCharacterMutation,
    useGetCharactersQuery,
    useDeleteCharacterMutation,
    useUpdateCharacterMutation
} = characterApi;
