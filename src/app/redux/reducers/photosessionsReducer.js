import { createSlice } from '@reduxjs/toolkit';
import { getElements, getElement, addElement, editElement, deleteElement } from "../actions/photosessionsActions";
import { successMessages } from '../../assets/scripts/successMessages';
import { errorMessages } from '../../assets/scripts/errorMessages';

// Состояние редьюсера
const initialState = {
    photosessions: null,
    photosession: null,
    success: undefined,
    error: undefined,
    newFormVisibility: false,
}

export const photosessionsReducer = createSlice({
    name: "photosessions",
    initialState: initialState,
    reducers: {
        selectPhotosession: (state, action) => { state.photosession = state.photosessions.find(i => i.id === action.payload) },
        removeSuccess: (state) => { state.success = undefined },
        removeError: (state) => { state.error = undefined },
        setNewFormVisibility: (state, action) => { state.newFormVisibility = action.payload }
    },
    extraReducers: {
        [getElements.fulfilled]: (state, action) => {
            if (!action.payload.error) {
                state.photosessions = action.payload.photosessions
            }
            else state.error = action.payload.error;
        },
        [getElement.fulfilled]: (state, action) => {
            if (!action.payload.error) {
                state.photosession = action.payload.photosession
            }
            else state.error = action.payload.error;
        },
        [addElement.fulfilled]: (state, action) => {
            const error = action.payload.error;
            const errors = action.payload.errors;

            if (!error && !errors) {
                state.photosessions.push(action.payload.photosession);
                state.success = successMessages.createMessage;

                state.newFormVisibility = false;
            }
            else state.error = error ? action.payload.error : errorMessages.createMessage;
        },
        [editElement.fulfilled]: (state, action) => {
            const error = action.payload.error;
            const errors = action.payload.errors;

            if (!!error && !errors) {
                state.photosessions.map(item => (item.id === action.payload.photosession.id ? action.payload.photosession : item));
                state.success = successMessages.updateMessage;
            }
            else state.error = error ? action.payload.error : errorMessages.createMessage;
        },
        [deleteElement.fulfilled]: (state, action) => {
            if (!action.payload.error) {
                state.photosessions = state.photosessions.filter(item => item.id !== action.payload.id);
                state.success = successMessages.deleteMessage;
            }
            else state.error = action.payload.error;
        }
    }
});

const photosessions = state => state.photosessions.photosessions;
const photosession = state => state.photosessions.photosession;
const success = state => state.photosessions.success;
const error = state => state.photosessions.error;
const newFormVisibility = state => state.photosessions.newFormVisibility;

export const photosessionsActions = photosessionsReducer.actions;

export const photosessionsAsyncActions = {
    getElements,
    getElement,
    addElement,
    editElement,
    deleteElement
}

export const photosessionsSelectors = {
    photosessions,
    photosession,
    success,
    error,
    newFormVisibility
}

export default photosessionsReducer.reducer;