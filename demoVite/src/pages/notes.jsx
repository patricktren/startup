import React from 'react';

import "../css/main.css";

import gpt_notes_design from '../images/gpt-notes_design.png';

export function Notes(props) {
    return (
        <main className="main-notes">
            <section className="section-notes scrollbard-darkmode">
                <h4 style={{ textAlign: "center", marginTop: "5px" }}>Folders</h4>
                <ul className="ul-notes">
                    <li className="li-notes">Folder 1 (from database)</li>
                    <li className="li-notes">Folder 2</li>
                    <li className="li-notes">Folder 3 (shared via Websockets)</li>
                </ul>
            </section>
            <section className="section-notes">
                <h4 style={{ textAlign: "center", marginTop: "5px" }}>Pages</h4>
                <ul className="ul-notes">
                    <li className="li-notes">Page 1 (from database)</li>
                    <li className="li-notes">Page 2 (from database)</li>
                    <li className="li-notes">Page 3 (from database)</li>
                </ul>
            </section>
            <section className="section-notes-text-area">
                <h4>Current Page</h4>
                <hr/>
                <p>Database data -- notes created by user</p>
                <p>Websocket data -- notes created by user and/or other user that updates live as either user edits</p>
                
                <p>Example Query:</p>
                <div className="div-note">
                    <div className="div-note-grabber">....</div>
                    <textarea className="input-note">Query: Type your query or notes here...
        Chat-GPT: (Editable) Response from Chat-GPT...</textarea>
                </div>
                <div className="div-note">
                    <div className="div-note-grabber">....</div>
                    <textarea className="input-note"></textarea>
                    <div className="div-note-grabber">....</div>
                </div>
                
                <p>3rd Party service calls -- calls to Chat-GPT based on the user's input.</p>
                <div className="div-note">
                    <div className="div-note-grabber">....</div>
                    <textarea className="input-note">You and a friend can take shared notes here.</textarea>
                </div>
                <img src={gpt_notes_design} alt="Notes.html design concept" width="1000"/>
            </section>
        </main>
    );
}
