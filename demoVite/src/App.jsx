import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';

import { Index } from './index';

import { useState } from 'react';

import logo from './images/gpt-notes_logo_extradarkmode.png'

import './css/main.css';

function App() {
    return (
        <BrowserRouter>
            <div class="body-home">
                <header>
                    <img src={logo} alt="GPT-Notes" width="300" />
                    <nav>
                        <ul class="nav-ui">
                            <li class="nav-li"><NavLink to="/">Home</NavLink></li>
                            <li class="nav-li"><a href="notes.html">Notes</a></li>
                            <li class="nav-li"><a href="share-notes.html">Share Notes</a></li>
                            <li class="nav-li"><a href="about.html">About</a></li>
                        </ul>

                        <div class="nav-div-user-info">
                            <p class="txt-white">[CurrentUser]</p>
                            <button class="btn btn-green">Sign Out</button>
                        </div>

                    </nav>
                </header>
                <Routes>
                    <Route path="/" element={<Index />}/>
                    {/* <Route/>
                    <Route/>
                    <Route/> */}
                </Routes>
                <footer>
                    <a href="https://github.com/patricktren/startup/tree/main" target="_blank">GitHub - Patrick Warren</a>
                </footer>
            </div>

        </BrowserRouter>
    )
}

export default App
