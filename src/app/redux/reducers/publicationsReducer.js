import { createSlice } from '@reduxjs/toolkit';
import { getElements, addElement, editElement, deleteElement } from "../actions/publicationsActions";
import { successMessages } from '../../assets/scripts/successMessages';
import { errorMessages } from '../../assets/scripts/errorMessages';

// Состояние редьюсера
const initialState = {
    publications: null,
    success: undefined,
    error: undefined,
    newFormVisibility: false,
}

export const publicationsReducer = createSlice({
    name: "publications",
    initialState: initialState,
    reducers: {
        removeSuccess: (state) => { state.success = undefined },
        removeError: (state) => { state.error = undefined },
        setNewFormVisibility: (state, action) => { state.newFormVisibility = action.payload }
    },
    extraReducers: {
        [getElements.fulfilled]: (state, action) => {
            if (!action.payload.error) {
                state.publications = action.payload.publications
            }
            else state.error = action.payload.error;
        },
        [addElement.fulfilled]: (state, action) => {
            const error = action.payload.error;
            const errors = action.payload.errors;

            if (!error && !errors) {
                state.publications.push(action.payload.publication);
                state.success = successMessages.createMessage;

                state.newFormVisibility = false;
            }
            else state.error = error ? action.payload.error : errorMessages.createMessage;
        },
        [editElement.fulfilled]: (state, action) => {
            const error = action.payload.error;
            const errors = action.payload.errors;

            if (!error && !errors) {
                state.publications.map(item => (item.id === action.payload.publication.id ? action.payload.publication : item));
                state.success = successMessages.updateMessage;
            }
            else state.error = error ? action.payload.error : errorMessages.createMessage;
        },
        [deleteElement.fulfilled]: (state, action) => {
            if (!action.payload.error) {
                state.publications = state.publications.filter(item => item.id !== action.payload.id);
                state.success = successMessages.deleteMessage;
            }
            else state.error = action.payload.error;
        }
    }
});

const publications = state => state.publications.publications;
const success = state => state.publications.success;
const error = state => state.publications.error;
const newFormVisibility = state => state.publications.newFormVisibility;

export const publicationsActions = publicationsReducer.actions;

export const publicationsAsyncActions = {
    getElements,
    addElement,
    editElement,
    deleteElement
}

export const publicationsSelectors = {
    publications,
    success,
    error,
    newFormVisibility
}

export default publicationsReducer.reducer;




