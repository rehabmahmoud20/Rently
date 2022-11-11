import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    isLoggedin: false,
    checkingStatus: true,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authStatus(state, action) {
            state.isLoggedin = action.payload;
        },
        checkingStatus(state, action) {
            state.checkingStatus = action.payload;
        },
    },
});
export const authActions = authSlice.actions;

