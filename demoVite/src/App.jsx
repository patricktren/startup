import React from 'react';
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import Draggable from 'react-draggable';

import { useState } from 'react';

// sites and css
import './css/main.css';

import { Index } from './pages/index.jsx';
import { Notes } from './pages/notes.jsx';
import { ShareNotes } from './pages/shareNotes.jsx';
import { About } from './pages/about.jsx';

import { AuthState } from './login/authState';

// images
import logo from './images/gpt-notes_logo_extradarkmode.png'

function App() {
    const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
    const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
    const [authState, setAuthState] = React.useState(currentAuthState);

    const navigate = useNavigate();
    function logout() {
        localStorage.removeItem('userName');
        setUserName(null);
        setAuthState(AuthState.Unauthenticated);
        navigate('/');
    }

    return (
        <div>
            <header>
                <img src={logo} alt="GPT-Notes" width="300" />
                <nav>
                    <ul className="nav-ui">
                        <li className="nav-li"><NavLink to="">Home</NavLink></li>
                        {authState === AuthState.Authenticated && (
                            <li className="nav-li"><NavLink to="notes">Notes</NavLink></li>
                        )}
                        {authState === AuthState.Authenticated && (
                            <li className="nav-li"><NavLink to="share-notes">Share Notes</NavLink></li>
                        )}
                        <li className="nav-li"><NavLink to="about">About</NavLink></li>
                    </ul>

                    <div className="nav-div-user-info">
                        <p className="txt-white">{userName}</p>
                        {authState === AuthState.Authenticated && (
                            <button onClick={() => logout()} className="btn btn-green">Sign Out</button>
                        )}
                    </div>
                </nav>
            </header>

            <Routes>
                <Route path="/" element={<Index
                    userName={userName}
                    authState={authState}
                    onAuthChange={(userName, authState) => {
                        setAuthState(authState);
                        setUserName(userName);
                    }}
                />
                }
                    exact
                />
                <Route path="/notes" element={<Notes />} />
                <Route path="/share-notes" element={<ShareNotes />} />
                <Route path="/about" element={<About />} />
            </Routes>
            <footer>
                <a href="https://github.com/patricktren/startup/tree/main" target="_blank">GitHub - Patrick Warren</a>
            </footer>
        </div>

    )
}


export default App
