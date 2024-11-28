import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {authApi} from "./auth/api/authApi";
import {characterApi} from "./character/api/characterApi";
import {authSlice} from "./auth/model/authSlice";
import {tavernDialogueApi} from "./dialogue/api/tavernDialogueApi";



export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [characterApi.reducerPath]: characterApi.reducer,
        [tavernDialogueApi.reducerPath]: tavernDialogueApi.reducer,
        auth: authSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware, characterApi.middleware, tavernDialogueApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
