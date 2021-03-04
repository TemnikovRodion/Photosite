import { createSlice } from '@reduxjs/toolkit';
import { getElements, addElement, editElement, deleteElement } from "../actions/aboutActions";
import { successMessages } from '../../assets/scripts/successMessages';
import { errorMessages } from '../../assets/scripts/errorMessages';

// Состояние редьюсера
const initialState = {
    abouts: null,
    success: undefined,
    error: undefined,
    newFormVisibility: false,
}

export const aboutReducer = createSlice({
    name: "about",
    initialState: initialState ,
    reducers: {
        removeSuccess: (state) => { state.success = undefined },
        removeError: (state) => { state.error = undefined },
        setNewFormVisibility: (state, action) => { state.newFormVisibility = action.payload }
    },
    extraReducers: {
        [getElements.fulfilled]: (state, action) => { 
            if(!action.payload.error) {
                state.abouts = action.payload.abouts 
            }
            else state.error = action.payload.error;
        },
        [addElement.fulfilled]: (state, action) => {
            const error = action.payload.error;
            const errors = action.payload.errors;

            if(!error && !errors) {
                state.abouts.push(action.payload.about);
                state.success = successMessages.createMessage;

                state.newFormVisibility = false;
            }
            else state.error = error ? action.payload.error : errorMessages.createMessage;
        },
        [editElement.fulfilled]: (state, action) => {
            const error = action.payload.error;
            const errors = action.payload.errors;

            if(!error && !errors) {
                state.abouts.map(item => (item.id === action.payload.about.id ? action.payload.about : item));
                state.success = successMessages.updateMessage;
            }
            else state.error = error ? action.payload.error : errorMessages.createMessage;
        },
        [deleteElement.fulfilled]: (state, action) => {
            if(!action.payload.error) {
                state.abouts = state.abouts.filter(item => item.id !== action.payload.id);
                state.success = successMessages.deleteMessage;
            } 
            else state.error = action.payload.error;
        }
    }
});

const abouts = state => state.about.abouts;
const success = state => state.about.success;
const error = state => state.about.error;
const newFormVisibility = state => state.about.newFormVisibility;

export const aboutActions = aboutReducer.actions;

export const aboutsAsyncActions = { 
    getElements, 
    addElement, 
    editElement, 
    deleteElement
}

export const aboutsSelectors = {
    abouts,
    success,
    error,
    newFormVisibility
}

export default aboutReducer.reducer;