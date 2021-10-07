import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { NewNotebookAction } from "./actions";
import * as notebooksReducer from './reducer'

export const store = configureStore({
    reducer: {
        notebooksReducer: notebooksReducer.default
    },
    middleware: [thunk]
})

store.subscribe(() => console.log(store.getState()));

let initialNotebook = NewNotebookAction("Мои заметки");
let initialNotebook2 = NewNotebookAction("Мои заметки2");
store.dispatch(notebooksReducer.addNotebook(initialNotebook));
store.dispatch(notebooksReducer.addNotebook(initialNotebook2));

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>