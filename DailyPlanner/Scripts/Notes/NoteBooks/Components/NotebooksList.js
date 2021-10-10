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
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import React from 'react';
import * as core from '../../../Core/PlannerCore';
import { NewNoteAction } from '../actions';
import { notebooksSelector, useAppDispatch } from '../hooks';
import { addNote, getIsLoadingState, getNotebooks, getSelectedNote, getSelectedNotebook, removeNote, saveNoteBody } from '../reducer';
import { Note } from './Note';
import { Notebook } from './Notebook';
export function NotebooksList() {
    var isLoading = notebooksSelector(getIsLoadingState);
    var notebooks = notebooksSelector(getNotebooks);
    var selectedNotebook = notebooksSelector(getSelectedNotebook);
    var selectedNote = notebooksSelector(getSelectedNote);
    var dispatch = useAppDispatch();
    var currentText = '';
    var handleAddNoteClick = function () {
        core.default.modal.askForTextInput("Название заметки", "Укажите название:", function (input) {
            dispatch(addNote(NewNoteAction(input, "")));
            currentText = '';
        }, null);
    };
    var saveNote = function () {
        dispatch(saveNoteBody(currentText));
        core.default.popup.showSucess("Сохранение", "Изменения успешно сохранены!");
    };
    return (isLoading ? React.createElement("div", null,
        React.createElement("img", { src: "/loading.png", className: "loader" })) :
        React.createElement("div", { className: "columns-3 column-span-3" },
            React.createElement("div", { className: "notebooks" },
                React.createElement("div", { className: "list" },
                    React.createElement("ul", { id: "nobooks-list" }, notebooks.length > 0 ? notebooks.map(function (item) {
                        return (React.createElement("li", { className: item.id === selectedNotebook.id ? "active" : "", key: item.id },
                            React.createElement(Notebook, __assign({}, item))));
                    }) : ""))),
            React.createElement("div", { className: "notes-list" },
                React.createElement("div", { id: "notes-root" },
                    React.createElement("div", { className: "notes-wrapper" },
                        selectedNotebook && selectedNotebook.records && selectedNotebook.records.length > 0 ?
                            selectedNotebook.records.map(function (i) {
                                return (React.createElement(Note, { record: i, isSelected: i.id === selectedNote.id, key: i.id }));
                            }) : "",
                        React.createElement("div", { className: "note note-new", onClick: handleAddNoteClick },
                            React.createElement("h3", null, "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u043D\u043E\u0432\u0443\u044E \u0437\u0430\u043C\u0435\u0442\u043A\u0443"))))),
            React.createElement("div", { className: "notes-editor" },
                React.createElement("div", { className: "editor-actions" },
                    React.createElement("div", { className: "actions" },
                        React.createElement("button", { className: "btn btn-primary", title: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C", onClick: function () { return dispatch(removeNote(selectedNote)); } },
                            React.createElement("i", { className: "icon trash" })))),
                React.createElement("div", { className: "editor-textarea" },
                    React.createElement(CKEditor, { editor: ClassicEditor, data: selectedNote ? selectedNote.body : "", onChange: function (event, editor) {
                            currentText = editor.getData();
                        }, disabled: selectedNote ? false : true }),
                    React.createElement("button", { className: "btn btn-primary float-right", disabled: selectedNote ? false : true, type: "button", onClick: saveNote }, "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C")))));
}
//# sourceMappingURL=NotebooksList.js.map