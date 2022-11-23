import {configureStore }from '@reduxjs/toolkit';
import { authReducer } from './slices/auth';
import { usersReducer } from './slices/user';

const store = configureStore({
    reducer: {
        users: usersReducer,
        auth: authReducer
    }
})

export default store;