import React from 'react';

import "../css/main.css";

import gpt_notes_design from '../images/gpt-notes_design.png';

export function ShareNotes(props) {
    return (
        <main className="main-login">
        <section>
            <h2>Share notes with another user!</h2>
            <h4>Select the Folder you would like to share:</h4>
            <ul className="ul-notes">
                <li className="li-notes">Folder 1 (from database)</li>
                <li className="li-notes">Folder 2 (from database)</li>
            </ul>
            <h4>Enter the email of the user you would like to share this Folder to:</h4>
            <input className="input-txt" type="text" name="" id=""/>
            <button className="btn btn-green">Send</button>
        </section>
    </main>
    );
}
