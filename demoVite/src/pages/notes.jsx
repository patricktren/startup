import React from 'react';

import Draggable from 'react-draggable';


import "../css/main.css";
import gpt_notes_design from '../images/gpt-notes_design.png';
import folder_image from '../images/folder.png';


export function Notes() {
    // const dragHandlers = {onStart: this.onStart, onStop: this.onStop};
    // const {deltaPosition, controlledPosition} = this.state;
    return (
        <main className="main-notes">
            <section className="section-notes">
                <img scr={folder_image} alt="Folder" width="100" />
                <h4 style={{ textAlign: "center", marginTop: "5px" }}>Folders</h4>

                <ul className="ul-notes">
                    <li className="li-notes">Folder 1 (from database)</li>
                    <li className="li-notes">Folder 2</li>
                    <li className="li-notes">Folder 3 (shared via Websockets)</li>
                </ul>
            </section>
            <section className="section-notes">
                <h4 style={{ textAlign: "center", marginTop: "5px" }}>Folders</h4>
                <ul className="ul-notes">
                    <li className="li-notes">Page 1 (from database)</li>
                    <li className="li-notes">Page 2 (from database)</li>
                    <li className="li-notes">Page 3 (from database)</li>
                </ul>
            </section>

            <section className="section-notes-text-area">
                <Note />
            </section>
        </main>
    )
}

function Note() {
    return (
        <Draggable handle='.div-note-grabber' bounds='parent'>
            <div className="div-note">
                <div className="div-note-grabber">....</div>
                <textarea className="input-note">Query: Type your query or notes here...
                    Chat-GPT: (Editable) Response from Chat-GPT...</textarea>
            </div>
        </Draggable>
    )
}