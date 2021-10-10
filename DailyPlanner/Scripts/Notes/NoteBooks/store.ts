import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { NewNotebookAction } from "./actions";
import * as notebooksReducer from './reducer'
import { INotebook } from "./types";

export const store = configureStore({
    reducer: {
        notebooksReducer: notebooksReducer.default
    },
    middleware: [thunk]
})

store.dispatch(notebooksReducer.startLoading());
fetch("Notebooks/GetNotebooks", {
    method: "GET",
    headers: {
        "content-type": "appliaction/json"
    }
}).then(async (resp) => {
    if (resp.ok) {
        var response = await resp.json() as any;
        for (let i = 0; i < response.notebooks.length; i++) {
            store.dispatch(notebooksReducer.addNotebook(response.notebooks[i]));
        }
    }
    store.dispatch(notebooksReducer.endLoading());
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>