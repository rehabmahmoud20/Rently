import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './authentication';
const Store = configureStore({
    reducer: {
        authentication: authSlice.reducer,
    },
});

export default Store;
