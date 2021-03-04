import { createSlice } from '@reduxjs/toolkit';
import { sendMessage } from "../actions/messageActions";
import { successMessages } from '../../assets/scripts/successMessages';

// Состояние редьюсера
const initialState = {
    message: null,
    success: undefined,
    error: undefined,
    newFormVisibility: false,
}

export const messageReducer = createSlice({
    name: "message",
    initialState: initialState ,
    reducers: {
        removeSuccess: (state) => { state.success = undefined },
        removeError: (state) => { state.error = undefined },
        setNewFormVisibility: (state, action) => { state.newFormVisibility = action.payload }
    },
    extraReducers: {
        [sendMessage.fulfilled]: (state, action) => { 
            if(!action.payload.error) {
                state.success = successMessages.sendMessage;
                state.newFormVisibility = false;
            }
            else state.error = action.payload.error;
        },
    }
});

const success = state => state.message.success;
const error = state => state.message.error;
const newFormVisibility = state => state.message.newFormVisibility;

export const messagesActions = messageReducer.actions;

export const messageAsyncActions = { 
    sendMessage, 
}

export const messageSelectors = {
    success,
    error,
    newFormVisibility
}

export default messageReducer.reducer;