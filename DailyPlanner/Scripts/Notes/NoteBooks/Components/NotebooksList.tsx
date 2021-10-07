import React from 'react';
import { Notebook } from './Notebook';
import * as reactRedux from 'react-redux';
import { addNewNote, addNote, getNotebooks, getSelectedNote, getSelectedNotebook, selectNotebook } from '../reducer';
import { notebooksSelector, useAppDispatch } from '../hooks';
import { NewNoteAction, NewNotebookAction } from '../actions';
import { IRecord } from '../types';
import * as core from '../../../Core/PlannerCore';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Note } from './Note';

export function NotebooksList() {
    const notebooks = notebooksSelector(getNotebooks);
    const selectedNotebook = notebooksSelector(getSelectedNotebook);
    const selectedNote = notebooksSelector(getSelectedNote);
    const dispatch = useAppDispatch();
    let currentText:string = '';
    const handleAddNoteClick = () => {
        core.default.modal.askForTextInput("Название заметки", "Укажите название:", (input) => {
            dispatch(addNote(NewNoteAction(input, currentText)));
            currentText = '';
        }, null);
    }
    return (
        <div className="columns-3 column-span-3">
            <div className="notebooks">
                <div className="list">
                    <ul id="nobooks-list">
                        {
                            notebooks.map((item) => {
                                return (
                                    <li className={item.id === selectedNotebook.id ? "active" : ""} key={item.id}>
                                        <Notebook {...item} />
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
            <div className="notes-list">
                <div id="notes-root">
                    <div className="notes-wrapper">
                        {selectedNotebook.records.map(i => {
                            return (
                                <Note record={i} isSelected={i.id === selectedNote.id} />
                            );
                        })
                        }
                        

                        <div className="note note-new" onClick={handleAddNoteClick}>
                            <h3>Создать новую заметку</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className="notes-editor">
                <div className="editor-actions">
                    <div className="actions">

                        <div className="button-group">
                            <button type="button" title="Сохранить"><i className="icon journal"></i></button>
                            <button type="button" title="Удалить"><i className="icon trash"></i></button>
                        </div>
                    </div>
                </div>
                <div className="editor-textarea">
                    <CKEditor
                        editor={ClassicEditor}
                        data={selectedNote ? selectedNote.body : ""}
                        onChange={(event, editor) => {
                            currentText = editor.getData();
                        }}
                    />
                </div>
            </div>
        </div>
    );
}