import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    userData: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUserData(state, action) {
            state.userData = { ...action.payload };
        },
        setIsLoading(state, action) {
            state.isLoading = action.payload;
        },
    },
});
export const userActions = userSlice.actions;
