import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    rentalsData: null,
};

export const rentalsSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateRentalsList(state, action) {
            state.rentalsData = [ ...action.payload ];
        },
    },
});
export const rentalsActions = rentalsSlice.actions;
