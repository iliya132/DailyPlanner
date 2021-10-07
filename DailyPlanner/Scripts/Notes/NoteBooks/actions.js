import { Guid } from "js-guid";
export function NewNotebookAction(name) {
    return {
        createdAt: new Date().toLocaleDateString(),
        id: Guid.newGuid().toString(),
        title: name,
        records: []
    };
}
export function NewNoteAction(name, body) {
    return {
        body: body,
        created_at: new Date().toLocaleDateString(),
        id: Guid.newGuid().toString(),
        name: name
    };
}
//# sourceMappingURL=actions.js.map