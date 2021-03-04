import { createSlice } from '@reduxjs/toolkit';
import { getToken } from "../actions/loginActions";

// Состояние редьюсера
const initialState = {
    token: null,
    success: undefined,
    error: undefined,
    isAuthorized: false
}

export const loginReducer = createSlice({
    name: "login",
    initialState: initialState,
    reducers: {
        checkUserToken: (state) => {
            let token = localStorage.getItem('accessToken');
            if(token) state.isAuthorized = true;
        }
    },
    extraReducers: {
        [getToken.fulfilled]: (state, action) => { 
            if(!action.payload.error) {
                localStorage.setItem('accessToken', action.payload.accessToken);
                state.isAuthorized = true;
            }
            else state.error = action.payload.error;
        },
    }
});

const isAuthorized = state => state.login.isAuthorized;
const error = state => state.login.error;

export const loginActions = loginReducer.actions;

export const loginAsyncActions = { 
    getToken, 
}

export const loginSelectors = {
    isAuthorized,
    error
}

export default loginReducer.reducer;