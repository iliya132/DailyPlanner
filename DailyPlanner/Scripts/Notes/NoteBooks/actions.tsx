import { Guid } from "js-guid";
import { INotebook, IRecord } from "./types";

export function NewNotebookAction(name: string):INotebook{
    return {
        createdAt: new Date().toLocaleDateString(),
        id: Guid.newGuid().toString(),
        name: name,
        color: "red",
        records: []
    }
}

export function NewNoteAction(name: string, body: string): IRecord {
    return {
        body: body,
        createdAt: new Date().toLocaleDateString(),
        id: Guid.newGuid().toString(),
        name: name
    }
}