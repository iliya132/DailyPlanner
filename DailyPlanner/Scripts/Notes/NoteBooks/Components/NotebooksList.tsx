import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import React from 'react';
import * as core from '../../../Core/PlannerCore';
import { NewNoteAction } from '../actions';
import { notebooksSelector, useAppDispatch } from '../hooks';
import { addNote, getNotebooks, getSelectedNote, getSelectedNotebook, removeNote, saveNoteBody } from '../reducer';
import { Note } from './Note';
import { Notebook } from './Notebook';

export function NotebooksList() {
    const notebooks = notebooksSelector(getNotebooks);
    const selectedNotebook = notebooksSelector(getSelectedNotebook);
    const selectedNote = notebooksSelector(getSelectedNote);
    const dispatch = useAppDispatch();
    let currentText: string = '';
    const handleAddNoteClick = () => {
        core.default.modal.askForTextInput("Название заметки", "Укажите название:", (input) => {
            dispatch(addNote(NewNoteAction(input, "")));
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
                            return (<Note record={i} isSelected={i.id === selectedNote.id} key={i.id} />);
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
                            <button className="btn btn-primary" title="Удалить" onClick={()=>dispatch(removeNote(selectedNote))}><i className="icon trash"></i></button>
                    </div>
                </div>
                <div className="editor-textarea">
                    <CKEditor
                        editor={ClassicEditor}
                        data={selectedNote ? selectedNote.body : ""}
                        onChange={(event, editor) => {
                            currentText = editor.getData();
                        }}
                        disabled={selectedNote ? false : true}
                    />
                    <button className="btn btn-primary float-right" disabled={selectedNote ? false : true} type="button" onClick={() => dispatch(saveNoteBody(currentText))}>Сохранить</button>
                </div>
            </div>
        </div>
    );
}
