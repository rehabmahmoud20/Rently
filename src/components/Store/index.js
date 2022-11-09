import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './authentication';
import { rentalsSlice } from './rentals';
import { userSlice } from './user';
const Store = configureStore({
    reducer: {
        authentication: authSlice.reducer,
        user: userSlice.reducer,
        rentals: rentalsSlice.reducer,
    },
});

export default Store;
