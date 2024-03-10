import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IUserReducerInitialState, TUser } from '../../Types/user-types';



const initialState: IUserReducerInitialState = {
    user: null,
    loading: true,
}



export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        loginUser: (state, action: PayloadAction<TUser>) => {
            state.user = action.payload;
            state.loading = false;
        },
        logoutUser: (state) => {
            state.user = null;
            state.loading = false;
        },
    }


});


export const { loginUser, logoutUser } = userSlice.actions;

