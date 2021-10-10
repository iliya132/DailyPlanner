var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _a;
import { createSlice } from '@reduxjs/toolkit';
import { store } from './store';
;
var initialState = {
    notebooks: [],
    selectedNotebook: null,
    selectedNote: null,
    isLoading: true
};
export var reducer = createSlice({
    name: "notebooksSlice",
    initialState: initialState,
    reducers: {
        addNotebook: function (state, action) {
            console.log(action.payload);
            state.notebooks = __spreadArray(__spreadArray([], state.notebooks, true), [action.payload], false);
            if (state.notebooks.length === 1) {
                state.selectedNotebook = state.notebooks[0];
            }
        },
        removeNotebook: function (state, action) {
            state.notebooks = state.notebooks.filter(function (i) { return i.id !== action.payload.id; });
        },
        selectNotebook: function (state, action) {
            state.selectedNotebook = action.payload;
            state.selectedNote = state.selectedNotebook.records.length > 0 ? state.selectedNotebook.records[0] : null;
        },
        addNote: function (state, action) {
            state.notebooks.find(function (i) { return i.id == state.selectedNotebook.id; }).records.push(action.payload);
            state.selectedNotebook = state.notebooks.find(function (i) { return i.id == state.selectedNotebook.id; });
            state.selectedNote = action.payload;
        },
        removeNote: function (state, action) {
            var selectedNotebook = state.notebooks.find(function (i) { return i.id == state.selectedNotebook.id; });
            var rec = selectedNotebook.records.find(function (i) { return i.id === action.payload.id; });
            selectedNotebook.records = selectedNotebook.records.filter(function (i) { return i.id !== rec.id; });
            state.selectedNotebook = selectedNotebook;
            if (selectedNotebook.records.length === 0) {
                state.selectedNote = null;
            }
            else {
                state.selectedNote = selectedNotebook.records[0];
            }
        },
        selectNote: function (state, action) {
            state.selectedNote = action.payload;
        },
        saveNoteBody: function (state, action) {
            state.selectedNote.body = action.payload;
            state.selectedNotebook.records.find(function (i) { return i.id === state.selectedNote.id; }).body = action.payload;
            state.notebooks.find(function (i) { return i.id === state.selectedNotebook.id; }).records.find(function (i) { return i.id === state.selectedNote.id; }).body = action.payload;
        },
        startLoading: function (state) {
            state.isLoading = true;
        },
        endLoading: function (state) {
            state.isLoading = false;
        }
    }
});
export var addNotebook = (_a = reducer.actions, _a.addNotebook), removeNotebook = _a.removeNotebook, selectNotebook = _a.selectNotebook, addNote = _a.addNote, selectNote = _a.selectNote, saveNoteBody = _a.saveNoteBody, removeNote = _a.removeNote, startLoading = _a.startLoading, endLoading = _a.endLoading;
export default reducer.reducer;
export var getNotebooks = function (State) { return State.notebooksReducer.notebooks; };
export var getSelectedNotebook = function (State) { return State.notebooksReducer.selectedNotebook; };
export var getIsLoadingState = function (state) { return state.notebooksReducer.isLoading; };
export var getSelectedNote = function (State) { return State.notebooksReducer.selectedNote; };
export var addNewNote = function (note) {
    store.dispatch(reducer.actions.addNote(note));
};
//# sourceMappingURL=reducer.js.map