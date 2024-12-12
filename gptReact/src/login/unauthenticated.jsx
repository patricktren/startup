import React from 'react';

// import { MessageDialog } from './messageDialog';

import { AuthState } from './authState';

import "../css/main.css";

import gpt_notes_example from "../images/gpt-notes-example.png";


export function Unauthenticated(props) {
    const [userName, setUserName] = React.useState(props.userName);
    const [password, setPassword] = React.useState('');
    const [displayError, setDisplayError] = React.useState('');

    async function loginUser() {
        loginOrCreate(`/api/auth/login`);
    }

    async function createUser() {
        loginOrCreate(`/api/auth/create`);
    }

    async function loginOrCreate(endpoint) {
        const response = await fetch(endpoint, {
            method: 'post',
            body: JSON.stringify({ email: userName, password: password }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        if (response?.status === 200) {
            const body = await response.json();
            localStorage.setItem('userName', userName);
            // localStorage.setItem('authToken', body.token);
            props.onLogin(userName, AuthState.Authenticated);
        } else {
            const body = await response.json();
            setDisplayError(`⚠ Error: ${body.msg}`);
            console.log(`⚠ Error: ${body.msg}`);
        }
    }

    return (
        <>
            <main className="main-login">
                <section>
                    <h3>Username:</h3>
                    <input className="input-txt" type='text' value={userName} onChange={(e) => setUserName(e.target.value)} placeholder='your@email.com' />
                    <p></p>
                    <h3>Password:</h3>
                    <input className="input-txt" type='password' onChange={(e) => setPassword(e.target.value)} placeholder='password' />
                    <p>{displayError}</p>
                    <button onClick={() => loginUser()} disabled={!userName || !password} className="btn btn-green">Login</button>
                    <button onClick={() => createUser()} disabled={!userName || !password} className="btn btn-green">Create</button>
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
