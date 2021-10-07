var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React from 'react';
import { Notebook } from './Notebook';
import { addNote, getNotebooks, getSelectedNotebook } from '../reducer';
import { notebooksSelector, useAppDispatch } from '../hooks';
import { NewNoteAction } from '../actions';
import * as core from '../../../Core/PlannerCore';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
export function NotebooksList() {
    var notebooks = notebooksSelector(getNotebooks);
    var selectedNotebook = notebooksSelector(getSelectedNotebook);
    var dispatch = useAppDispatch();
    var currentText = '';
    var handleAddNoteClick = function () {
        core.default.modal.askForTextInput("Название заметки", "Укажите название:", function (input) {
            dispatch(addNote(NewNoteAction(input, $("#NoteBody").val())));
        }, null);
    };
    return (React.createElement("div", { className: "columns-3 column-span-3" },
        React.createElement("div", { className: "notebooks" },
            React.createElement("div", { className: "list" },
                React.createElement("ul", { id: "nobooks-list" }, notebooks.map(function (item) {
                    return (React.createElement("li", { className: item.id === selectedNotebook.id ? "active" : "", key: item.id },
                        React.createElement(Notebook, __assign({}, item))));
                })))),
        React.createElement("div", { className: "notes-list" },
            React.createElement("div", { id: "notes-root" },
                React.createElement("div", { className: "notes-wrapper" },
                    selectedNotebook.records.map(function (i) {
                        return (React.createElement("div", { className: "note", key: i.id },
                            React.createElement("h3", null, i.name),
                            React.createElement("p", null, i.created_at)));
                    }),
                    React.createElement("div", { className: "note note-new", onClick: handleAddNoteClick },
                        React.createElement("h3", null, "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u043D\u043E\u0432\u0443\u044E \u0437\u0430\u043C\u0435\u0442\u043A\u0443"))))),
        React.createElement("div", { className: "notes-editor" },
            React.createElement("div", { className: "editor-actions" },
                React.createElement("div", { className: "actions" },
                    React.createElement("div", { className: "button-group" },
                        React.createElement("button", { type: "button", title: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C" },
                            React.createElement("i", { className: "icon journal" })),
                        React.createElement("button", { type: "button", title: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C" },
                            React.createElement("i", { className: "icon trash" }))))),
            React.createElement("div", { className: "editor-textarea" },
                React.createElement(CKEditor, { editor: ClassicEditor, data: currentText, onChange: function (event, editor) {
                        currentText = editor.getData();
                    } })))));
}
//# sourceMappingURL=NotebooksList.js.map