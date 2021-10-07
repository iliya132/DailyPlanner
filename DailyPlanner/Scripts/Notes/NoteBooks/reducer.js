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
    selectedNotebook: null
};
export var reducer = createSlice({
    name: "notebooksSlice",
    initialState: initialState,
    reducers: {
        addNotebook: function (state, action) {
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
        },
        addNote: function (state, action) {
            state.notebooks.find(function (i) { return i.id == state.selectedNotebook.id; }).records.push(action.payload);
            state.selectedNotebook = state.notebooks.find(function (i) { return i.id == state.selectedNotebook.id; });
        }
    }
});
export var addNotebook = (_a = reducer.actions, _a.addNotebook), removeNotebook = _a.removeNotebook, selectNotebook = _a.selectNotebook, addNote = _a.addNote;
export default reducer.reducer;
export var getNotebooks = function (State) { return State.notebooksReducer.notebooks; };
export var getSelectedNotebook = function (State) { return State.notebooksReducer.selectedNotebook; };
export var addNewNote = function (note) {
    store.dispatch(reducer.actions.addNote(note));
};
//# sourceMappingURL=reducer.js.map