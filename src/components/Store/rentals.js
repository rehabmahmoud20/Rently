import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    rentalsData: null,
    fetchRentals: false
};

export const rentalsSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateRentalsList(state, action) {
            state.rentalsData = [ ...action.payload ];
        },
        updateFetchData(state, action) {
            state.fetchRentals = action.payload
        }
    },
});
export const rentalsActions = rentalsSlice.actions;
