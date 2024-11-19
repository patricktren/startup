import React, { useState } from 'react';

import Draggable from 'react-draggable';


import "../css/main.css";
import gpt_notes_design from '../images/gpt-notes_design.png';
import folder_image from '../images/folder.png';


export function Notes() {
    const [notes, setNotes] = useState([{x:50, y:50, text:''}]);
    const addNote = (event) => {
        if (event.target.className == 'section-blackboard') {
            const x = event.nativeEvent.offsetX;
            const y = event.nativeEvent.offsetY;
            console.log(x, y)

            setNotes((prevNotes) => [...prevNotes, {x:x, y:y, text:''}]);
        }
        
    }

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

            <section className="section-blackboard" onClick={(event) => addNote(event)}>
                {notes.map((note, index) => {
                    return (<Note key={index} x={note.x} y={note.y} text={note.text} />);
                })}
            </section>
        </main>
    )
}

function CreateNote(event) {
    const x = event.nativeEvent.offsetX;
    const y = event.nativeEvent.offsetY;
    console.log(`${x} ${y}`);
    const className = event.target.className; // Get the class of the hovered element
    console.log(`Hovered over element with class: ${className}`);

    return ({x: x, y: y, text:''});
}

function Note({x, y, text}) {
    const [position, setPosition] = useState({x:x, y:y})
    const drag = (event, data) => {
        setPosition({x: data.x, y: data.y});
    }
    const [content, updateContent] = useState(text);
    const contentChange = (event) => {
        updateContent(event.target.value);
    }

    return (
        <Draggable handle='.div-note-grabber' bounds='parent' position={position} onDrag={drag}>
            <div className="div-note">
                <div className="div-note-grabber">....<span className='div-note-delete'>x</span></div>
                <textarea className="input-note" onChange={contentChange} value={content} />
            </div>
        </Draggable>
    )
}