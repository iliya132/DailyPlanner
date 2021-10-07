import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { NewNotebookAction } from "./actions";
import * as notebooksReducer from './reducer';
export var store = configureStore({
    reducer: {
        notebooksReducer: notebooksReducer.default
    },
    middleware: [thunk]
});
store.subscribe(function () { return console.log(store.getState()); });
var initialNotebook = NewNotebookAction("Мои заметки");
var initialNotebook2 = NewNotebookAction("Мои заметки2");
store.dispatch(notebooksReducer.addNotebook(initialNotebook));
store.dispatch(notebooksReducer.addNotebook(initialNotebook2));
//# sourceMappingURL=store.js.map