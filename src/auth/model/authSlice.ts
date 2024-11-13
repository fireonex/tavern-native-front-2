import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
    token: string | null;
    userId: string | null;
    username: string | null;
};

const initialState: AuthState = {
    token: null,
    userId: null,
    username: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        setUserInfo: (state, action: PayloadAction<{ userId: string; username: string }>) => {
            state.userId = action.payload.userId;
            state.username = action.payload.username;
        },
        clearAuth: (state) => {
            state.token = null;
            state.userId = null;
            state.username = null;
        },
    },
});
