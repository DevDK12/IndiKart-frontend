import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IUserReducerInitialState, TUser } from '../../Types/user-types';
import { TAccessToken } from '@/Types/apiTypes';



const initialState: IUserReducerInitialState = {
    user: null,
    token: null,
    loading: true,
}



export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        saveUser: (state, action: PayloadAction<TUser>) => {
            state.user = action.payload;
            state.loading = false;
        },
        deleteUser: (state) => {
            state.user = null;
            state.token = null;
            state.loading = false;
        },

        saveToken: (state, action: PayloadAction<TAccessToken>) => {
            state.token = action.payload;
        }
    }


});


export const { saveUser, deleteUser, saveToken } = userSlice.actions;

