import react from 'react';
import redux, { createSlice, PayloadAction } from '@reduxjs/toolkit'
import * as reactRedux from 'react-redux'
import { INotebook, IRecord } from './types';
import { RootState, store } from './store';
import * as core from '../../Core/PlannerCore'
import { AddNote, AddNotebook, RemoveNote, RemoveNotebook, UpdateNote } from './thunks';

interface notebooksState {
    notebooks: INotebook[],
    selectedNotebook: INotebook,
    selectedNote: IRecord,
    isLoading:boolean
};

const initialState: notebooksState = {
    notebooks: [],
    selectedNotebook: null,
    selectedNote: null,
    isLoading: true
};

export const reducer = createSlice({
    name: "notebooksSlice",
    initialState,
    reducers: {
        addNotebook: (state, action: PayloadAction<INotebook>) => {
            console.log(action.payload);
            state.notebooks = [...state.notebooks, action.payload]
            if (state.notebooks.length === 1) {
                state.selectedNotebook = state.notebooks[0];
            }
        },
        removeNotebook: (state, action: PayloadAction<INotebook>) => {
            state.notebooks = state.notebooks.filter(i => i.id !== action.payload.id)
        },
        selectNotebook: (state, action: PayloadAction<INotebook>) => {
            state.selectedNotebook = action.payload
            state.selectedNote = state.selectedNotebook.records.length > 0 ? state.selectedNotebook.records[0] : null;
        },
        addNote: (state, action: PayloadAction<IRecord>) => {
            state.notebooks.find(i => i.id == state.selectedNotebook.id).records.push(action.payload);
            state.selectedNotebook = state.notebooks.find(i => i.id == state.selectedNotebook.id);
            state.selectedNote = action.payload;
        },
        removeNote: (state, action: PayloadAction<IRecord>) => {
            let selectedNotebook = state.notebooks.find(i => i.id == state.selectedNotebook.id);
            let rec = selectedNotebook.records.find(i => i.id === action.payload.id);
            selectedNotebook.records = selectedNotebook.records.filter(i => i.id !== rec.id);
            state.selectedNotebook = selectedNotebook;
            if (selectedNotebook.records.length === 0) {
                state.selectedNote = null;
            } else {
                state.selectedNote = selectedNotebook.records[0];
            }
        },
        selectNote: (state, action: PayloadAction<IRecord>) => {
            state.selectedNote = action.payload;
        },
        saveNoteBody: (state, action: PayloadAction<string>) => {
            state.selectedNote.body = action.payload;
            state.selectedNotebook.records.find(i => i.id === state.selectedNote.id).body = action.payload;
            state.notebooks.find(i => i.id === state.selectedNotebook.id).records.find(i => i.id === state.selectedNote.id).body = action.payload;
        },
        startLoading: (state) => {
            state.isLoading = true;
        },
        endLoading: (state) => {
            state.isLoading = false;
        }
    }
});

export const { addNotebook, removeNotebook, selectNotebook, addNote, selectNote, saveNoteBody, removeNote, startLoading, endLoading } = reducer.actions;
export default reducer.reducer;
export const getNotebooks = (State: RootState) => State.notebooksReducer.notebooks;
export const getSelectedNotebook = (State: RootState) => State.notebooksReducer.selectedNotebook;
export const getIsLoadingState = (state: RootState) => state.notebooksReducer.isLoading;
export const getSelectedNote = (State: RootState) => State.notebooksReducer.selectedNote;
export const addNewNote = (note: IRecord) => {
        store.dispatch(reducer.actions.addNote(note));
}

export function AddNoteBookThunk(notebook: INotebook){
    store.dispatch(reducer.actions.startLoading);
    AddNotebook(notebook).then((response) => {
        if (response.ok) {
            store.dispatch(reducer.actions.addNotebook(notebook));
            core.default.popup.showSucess("Изменения сохранены", "Успешно сохранили новую записную книжку");
        } else {
            core.default.popup.showError("Неудача при отправлении на сервер", "Возникла непредвиденная ошибка при отправке сообщения на сервер" + response.body);
        }
        store.dispatch(reducer.actions.endLoading);
    })
}

export function RemoveNoteBookThunk(notebook: INotebook) {
    store.dispatch(reducer.actions.startLoading);
    RemoveNotebook(notebook.id).then((response) => {
        if (response.ok) {
            store.dispatch(reducer.actions.removeNotebook(notebook));
            core.default.popup.showSucess("Изменения успешно сохранены", "Успешно направили изменения на сервер");
        } else {
            core.default.popup.showError("Неудача при отправлении на сервер", "Возникла непредвиденная ошибка при отправке сообщения на сервер" + response.body);
        }
        store.dispatch(reducer.actions.endLoading);
    })
}

export function addNoteThunk(note: IRecord) {
    store.dispatch(reducer.actions.startLoading);
    AddNote(note).then((response) => {
        if (response.ok) {
            core.default.popup.showSucess("Изменения успешно сохранены", "Успешно направили изменения на сервер");
            store.dispatch(reducer.actions.addNote(note));
        } else {
            core.default.popup.showError("Неудача при отправлении на сервер", "Возникла непредвиденная ошибка при отправке сообщения на сервер" + response.body);
        }
        store.dispatch(reducer.actions.endLoading);
    })
}

export function updateNoteThunk(note: IRecord) {
    store.dispatch(reducer.actions.startLoading);
    UpdateNote(note).then((response) => {
        if (response.ok) {
            store.dispatch(reducer.actions.saveNoteBody(note.body));
            core.default.popup.showSucess("Изменения успешно сохранены", "Успешно направили изменения на сервер");
        } else {
            core.default.popup.showError("Неудача при отправлении на сервер", "Возникла непредвиденная ошибка при отправке сообщения на сервер" + response.body);
        }
        store.dispatch(reducer.actions.endLoading);
    })
}

export function RemoveNoteThunk(note: IRecord) {
    store.dispatch(reducer.actions.startLoading);
    RemoveNote(note).then((response) => {
        if (response.ok) {
            store.dispatch(reducer.actions.removeNote(note));
            core.default.popup.showSucess("Изменения успешно сохранены", "Успешно направили изменения на сервер");
        } else {
            core.default.popup.showError("Неудача при отправлении на сервер", "Возникла непредвиденная ошибка при отправке сообщения на сервер" + response.body);
        }
        store.dispatch(reducer.actions.endLoading);
    })
}