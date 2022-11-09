import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './authentication';
import { userSlice } from './user';
const Store = configureStore({
    reducer: {
        authentication: authSlice.reducer,
        user: userSlice.reducer,
    },
});

export default Store;
