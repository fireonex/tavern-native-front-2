import {createApi} from '@reduxjs/toolkit/query/react';
import {DialogueRequest, DialogueResponse} from './types';
import {ProjBaseQuery} from "../../common/api/baseQuery"; // Импортируем типы

export const tavernDialogueApi = createApi({
    reducerPath: 'tavernDialogueApi',
    baseQuery: ProjBaseQuery,
    tagTypes: ['Dialogue'],
    endpoints: (builder) => ({
        fetchDialogue: builder.mutation<DialogueResponse, DialogueRequest>({
            query: ({ userId, characterId, action }) => ({
                url: 'dialogue/continue',
                method: 'POST',
                body: { userId, characterId, action },
            }),
        }),
        endDialogue: builder.mutation<void, { userId: string, characterId: string }>({
            query: ({ userId, characterId }) => ({
                url: 'dialogue/end',
                method: 'DELETE',
                body: { userId, characterId },
            }),
        }),
    }),
});

export const { useFetchDialogueMutation, useEndDialogueMutation } = tavernDialogueApi;

