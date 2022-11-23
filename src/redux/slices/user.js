import {createSlice , createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios'

export const fetchUsers = createAsyncThunk('users/fetchUsers', async() => {
    const {data} = await axios.get('/users')

    return data;
})

export const fetchRemoveUsers = createAsyncThunk('users/fetchRemoveUsers', async(id) => {
    const {data} = await axios.delete(`/users/${id}`)
})

export const fetchBlockUsers = createAsyncThunk('block/fetchBlockUsers', async(id) => {
    const {data} = await axios.patch(`/block/${id}`)

    return data;
})

export const fetchUnblockUsers = createAsyncThunk('unblock/fetchUnblockUsers', async(id) => {
    const {data} = await axios.patch(`/unblock/${id}`)

    return data;
})

const initialState = {
    users: {
        items: [],
        status: 'loading'
    }
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchUsers.pending]: (state)=>{
            state.users.items = []
            state.users.status = 'loading'
        },
        [fetchUsers.fulfilled]: (state,action)=>{
            state.users.items = action.payload
            state.users.status = 'loaded'
        },
        [fetchUsers.rejected]: (state)=>{
            state.users.items = []
            state.users.status = 'error'
        },
        [fetchRemoveUsers.pending]: (state, action)=>{
            state.users.items = state.users.items.filter(obj => obj._id !== action.meta.arg);
        },
        [fetchBlockUsers.pending]: (state)=>{
            state.users.items = []
            state.users.status = 'loading'
        },
        [fetchBlockUsers.fulfilled]: (state,action)=>{
            state.users.items = action.payload
            state.users.status = 'loaded'
        },
        [fetchUnblockUsers.pending]: (state)=>{
            state.users.items = []
            state.users.status = 'loading'
        },
        [fetchUnblockUsers.fulfilled]: (state,action)=>{
            state.users.items = action.payload
            state.users.status = 'loaded'
        },

    }
})

export const usersReducer = usersSlice.reducer;