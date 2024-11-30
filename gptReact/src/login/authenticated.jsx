import React from 'react';
import { json, useNavigate } from 'react-router-dom';

import "../css/main.css";

import gpt_notes_example from "../images/gpt-notes-example.png";


export function Authenticated(props) {

    return (
        <>
            <main className="main-login">
                <section>
                    <h3>Welcome</h3>
                    <h3>to GPT Notes</h3>

                </section>
                <section>
                    <img
                        src={gpt_notes_example}
                        alt="gpt-notes-example"
                        width="500"
                        className="img-hero"
                    />
                </section>
            </main>

            {/* <MessageDialog message={displayError} onHide={() => setDisplayError(null)} /> */}
        </>
    );
}
