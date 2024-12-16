import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from "../../store";
import { DialogueRequest, DialogueResponse } from './types'; // Импортируем типы

export const tavernDialogueApi = createApi({
    reducerPath: 'tavernDialogueApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://cea1-89-23-5-24.ngrok-free.app/api/dialogue',
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
    tagTypes: ['Dialogue'],
    endpoints: (builder) => ({
        fetchDialogue: builder.mutation<DialogueResponse, DialogueRequest>({
            query: ({ userId, characterId, action }) => ({
                url: '/continue',
                method: 'POST',
                body: { userId, characterId, action },
            }),
        }),
        endDialogue: builder.mutation<void, { userId: string, characterId: string }>({
            query: ({ userId, characterId }) => ({
                url: '/end',
                method: 'DELETE',
                body: { userId, characterId },
            }),
        }),
    }),
});

export const { useFetchDialogueMutation, useEndDialogueMutation } = tavernDialogueApi;

