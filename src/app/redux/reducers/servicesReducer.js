import { createSlice } from '@reduxjs/toolkit';
import { getElements, addElement, editElement, deleteElement } from "../actions/servicesActions";
import { successMessages } from '../../assets/scripts/successMessages';
import { errorMessages } from '../../assets/scripts/errorMessages';

// Состояние редьюсера
const initialState = {
    services: null,
    success: undefined,
    error: undefined,
    newFormVisibility: false,
}

export const servicesReducer = createSlice({
    name: "services",
    initialState: initialState,
    reducers: {
        removeSuccess: (state) => { state.success = undefined },
        removeError: (state) => { state.error = undefined },
        setNewFormVisibility: (state, action) => { state.newFormVisibility = action.payload }
    },
    extraReducers: {
        [getElements.fulfilled]: (state, action) => {
            if (!action.payload.error) {
                state.services = action.payload.services
            }
            else state.error = action.payload.error;
        },
        [addElement.fulfilled]: (state, action) => {
            const error = action.payload.error;
            const errors = action.payload.errors;

            if (!error && !errors) {
                state.services.push(action.payload.service);
                state.success = successMessages.createMessage;

                state.newFormVisibility = false;
            }
            else state.error = error ? action.payload.error : errorMessages.createMessage;
        },
        [editElement.fulfilled]: (state, action) => {
            const error = action.payload.error;
            const errors = action.payload.errors;

            if (!error && !errors) {
                state.services.map(item => (item.id === action.payload.service.id ? action.payload.service : item));
                state.success = successMessages.updateMessage;
            }
            else state.error = error ? action.payload.error : errorMessages.createMessage;
        },
        [deleteElement.fulfilled]: (state, action) => {
            if (!action.payload.error) {
                state.services = state.services.filter(item => item.id !== action.payload.id);
                state.success = successMessages.deleteMessage;
            }
            else state.error = action.payload.error;
        }
    }
});

const services = state => state.services.services;
const success = state => state.services.success;
const error = state => state.services.error;
const newFormVisibility = state => state.services.newFormVisibility;

export const servicesActions = servicesReducer.actions;

export const servicesAsyncActions = {
    getElements,
    addElement,
    editElement,
    deleteElement
}

export const servicesSelectors = {
    services,
    success,
    error,
    newFormVisibility
}

export default servicesReducer.reducer;