import { Guid } from "js-guid";
import { ADD_NOTEBOOK_URL, ADD_NOTE_URL, REMOVE_NOTEBOOK_URL, REMOVE_NOTE_URL, UPDATE_NOTE_URL } from "./constants";
import { INotebook, IRecord } from "./types";

export function AddNotebook(note: INotebook) {
    return fetch(ADD_NOTEBOOK_URL, {
        method: "POST",
        headers: { "content-type": "appliaction/json" },
        body: JSON.stringify(note)
    })
}

export function RemoveNotebook(notebookId: string) {
    return fetch(REMOVE_NOTEBOOK_URL, {
        method: "DELETE",
        headers: { "content-type": "appliaction/json" },
        body: notebookId
    })
}

export function AddNote(note: IRecord) {
    return fetch(ADD_NOTE_URL, {
        method: "POST",
        headers: { "content-type": "appliaction/json" },
        body: JSON.stringify(note)
    })
}

export function UpdateNote(note: IRecord) {
    return fetch(UPDATE_NOTE_URL, {
        method: "PUT",
        headers: { "content-type": "appliaction/json" },
        body: JSON.stringify(note)
    });
}

export function RemoveNote(note: IRecord) {
    return fetch(REMOVE_NOTE_URL, {
            method: "DELETE",
            headers: { "content-type": "appliaction/json" },
            body: JSON.stringify(note)
        });
}