import React, { useState } from 'react';

import Draggable from 'react-draggable';


import "../css/main.css";
import gpt_notes_design from '../images/gpt-notes_design.png';
import folder_image from '../images/folder.png';


export function Notes() {
    const [folders, setFolders] = useState([ {selectFolder:{setSelectedFolder}, id:0} ]);
    const [pages, setPages] = useState([ { folderId:0, id:0} ])

    // next folder id
    const [nextFolderId, setNextFolderId] = useState(1);

    // next page id
    const [nextPageId, setNextPageId] = useState(1);

    // current folder/page
    const [currFolder, setCurrFolder] = useState(folders[0].id);
    const [currPage, setCurrPage] = useState(0);
    function setSelectedFolder(folderId) {
        setCurrFolder(folderId);
    }

    const addFolder = () => {
        // create folder
        setFolders((folders) => [...folders, {id: nextFolderId}]);

        // initialize first page
        setPages((pages) => [...pages, {folderId: nextFolderId, id: nextPageId}]);

        // increment id's
        setNextFolderId(nextFolderId + 1);
        setNextPageId(nextPageId + 1);
    }

    const addPage = () => {
        // create page
        setPages((pages) => [...pages, {folderId:currFolder, id:nextPageId}]);

        // increment page id
        setNextPageId(nextPageId + 1);
    }

    return (
        <main className="main-notes">
            <section className="section-notes">
                <h4 style={{ textAlign: "center", marginTop: "5px" }}>Folders</h4>
                <ul className="ul-notes">
                    {folders.map((folder, index) => {
                        return (<Folder key={index} selectFolder={setSelectedFolder} id={folder.id} />);
                    })}
                    <li className='btn btn-green' onClick={addFolder}>Add folder</li>
                </ul>
            </section>
            <section className="section-notes">
                <h4 style={{ textAlign: "center", marginTop: "5px" }}>Pages</h4>
                <ul className="ul-notes">
                    {pages
                        .filter((page, index) => page.folderId===currFolder)
                        .map((page, index) => {
                        return (<li key={index}>{page.name}</li>);
                    })}
                    <li className='btn btn-green' onClick={addPage}>Add page</li>
                </ul>
            </section>
            <Page name='ree' />
        </main>
    )
}

function Folder( {selectFolder, id} ) {
    const folderId=id;
    const [folderName, setName] = useState('myFolder');
    
    const [readOnly, setReadOnly] = useState(false);
    const rename = (event) => {
        setName(event.target.value);
    }
    const finishRename = (event) => {
        if (event.key==='Enter') {
            setReadOnly(true);
        }
    }


    function sendSelectedFolder() {
        if (readOnly == true) {
            selectFolder(folderId);
        }
    }

    const [pages, setPages] = useState([]);

    return (
        <li className='li-notes'><input className='input-txt' onClick={sendSelectedFolder} onChange={rename} onKeyDown={finishRename} readOnly={readOnly} value={folderName} /></li>
    )
}

function Page({ folderId, id, initPageName }) {
    const [pageName, setName] = useState(initPageName);
    const [nextNoteId, updateNoteId] = useState(1);

    const [notes, setNotes] = useState([{ id: 0, x: 50, y: 50, text: '' }]);
    const addNote = (event) => {
        if (event.target.className == 'section-blackboard') {
            const x = event.nativeEvent.offsetX;
            const y = event.nativeEvent.offsetY;
            setNotes((prevNotes) => [...prevNotes, { id: nextNoteId, x: x, y: y, text: '' }]);
            // increment nextNoteId
            updateNoteId(nextNoteId + 1);
        }
    }

    const deleteNote = (event) => {
        if (event.target.className == 'div-note-delete') {
            const idToDelete = event.target.getAttribute('id')
            setNotes(notes.filter(note => note.id != idToDelete));
        }
    }
    return (
        <section className="section-blackboard" onClick={(event) => { addNote(event); deleteNote(event) }}>
            {notes.map((note, index) => {
                return (<Note key={index} id={note.id} x={note.x} y={note.y} text={note.text} />);
            })}
        </section>
    )
}

function Note({ pageId, id, x, y, text }) {
    const [position, setPosition] = useState({ x: x, y: y })
    const drag = (event, data) => {
        setPosition({ x: data.x, y: data.y });
    }
    const [content, updateContent] = useState(text);
    const contentChange = (event) => {
        updateContent(event.target.value);
    }

    return (
        <Draggable handle='.div-note-grabber' bounds='parent' position={position} onDrag={drag}>
            <div className="div-note">
                <div className="div-note-grabber">....<span id={id} className='div-note-delete'>x</span></div>
                <textarea className="input-note" onChange={contentChange} value={content} />
            </div>
        </Draggable>
    )
}