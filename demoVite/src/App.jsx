import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { useState } from 'react';

// sites and css
import { Index } from './pages/index.jsx';
import { Notes } from './pages/notes.jsx';
import { ShareNotes } from './pages/shareNotes.jsx';
import { About } from './pages/about.jsx';

import './css/main.css';
// images
import logo from './images/gpt-notes_logo_extradarkmode.png'

function App() {
    return (
        <BrowserRouter>
            <div>
                <header>
                    <img src={logo} alt="GPT-Notes" width="300" />
                    <nav>
                        <ul class="nav-ui">
                            <li class="nav-li"><NavLink to="">Home</NavLink></li>
                            <li class="nav-li"><NavLink to="notes">Notes</NavLink></li>
                            <li class="nav-li"><NavLink to="share-notes">Share Notes</NavLink></li>
                            <li class="nav-li"><NavLink to="about">About</NavLink></li>
                        </ul>

                        <div class="nav-div-user-info">
                            <p class="txt-white">[CurrentUser]</p>
                            <button class="btn btn-green">Sign Out</button>
                        </div>
                    </nav>
                </header>
                <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/notes" element={<Notes />} />
                    <Route path="/share-notes" element={<ShareNotes />} />
                    <Route path="/about" element={<About />} />
                </Routes>
                <footer>
                    <a href="https://github.com/patricktren/startup/tree/main" target="_blank">GitHub - Patrick Warren</a>
                </footer>
            </div>

        </BrowserRouter>
    )
}

export default App
