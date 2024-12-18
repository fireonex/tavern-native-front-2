import {createApi} from '@reduxjs/toolkit/query/react';
import {
    CreateCharacterRequest,
    CreateCharacterResponse,
    UpdateCharacterRequest,
    UpdateCharacterResponse
} from './types';
import {Character} from "../../common/types";
import {ProjBaseQuery} from "../../common/api/baseQuery";

export const characterApi = createApi({
    reducerPath: 'characterApi',
    baseQuery: ProjBaseQuery,
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
