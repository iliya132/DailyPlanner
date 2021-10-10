import { Guid } from "js-guid";
export function NewNotebookAction(name) {
    return {
        createdAt: new Date().toLocaleDateString(),
        id: Guid.newGuid().toString(),
        name: name,
        color: "red",
        records: []
    };
}
export function NewNoteAction(name, body) {
    return {
        body: body,
        createdAt: new Date().toLocaleDateString(),
        id: Guid.newGuid().toString(),
        name: name
    };
}
//# sourceMappingURL=actions.js.map