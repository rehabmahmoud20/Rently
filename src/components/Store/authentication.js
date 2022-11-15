import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    isLoggedin: false,
    isLoading: true,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authStatus(state, action) {
            state.isLoggedin = action.payload;
        },
        setIsLoading(state, action) {
            state.isLoading = action.payload;
        },
    },
});
export const authActions = authSlice.actions;
