import React, { useState } from 'react';

import Draggable from 'react-draggable';


import "../css/main.css";
import gpt_notes_design from '../images/gpt-notes_design.png';
import folder_image from '../images/folder.png';


export function Notes() {
    const [folders, setFolders] = useState([{id: 0, name: 'New Folder' }]);
    const [pages, setPages] = useState([{ folderId: 0, id: 0, name: 'New Page' }]);
    const [notes, setNotes] = useState([ {pageId: 0, id: 0, x: 0, y: 0, text: ''} ]);

    // next folder id
    const [nextFolderId, setNextFolderId] = useState(1);

    // next page id
    const [nextPageId, setNextPageId] = useState(1);

    // next note id
    const [nextNoteId, setNextNoteId] = useState(1);

    // current folder/page
    const [currFolder, setCurrFolder] = useState(folders[0].id);
    const [currPage, setCurrPage] = useState(0);
    // const [currNotes, setCurrNotes] = useState();

    function setSelectedFolder(folderId) {
        setCurrFolder(folderId);
        setCurrPage(pages.filter((page) => page.folderId === folderId)[0])
        console.log('folder', folderId);
        console.log(folders);
    }

    function setSelectedPage(pageId) {
        setCurrPage(pageId);
        console.log('page', pageId);
        console.log(pages);
    }

    function renameFolder(folderId, newFolderName) {
        setFolders(folders.map((folder) => folder.id == folderId ? {...folder, name: newFolderName} : folder));
    }

    function renamePage(pageId, newPageName) {
        setPages(pages.map((page) => page.id == pageId ? {...page, name: newPageName} : page));
    }

    const addFolder = () => {
        // create folder
        setFolders((folders) => [...folders, { id: nextFolderId, name: 'New Folder' }]);

        // initialize first page
        setPages((pages) => [...pages, { folderId: nextFolderId, id: nextPageId, name: 'New Page' }]);

        // increment id's
        setNextFolderId(nextFolderId + 1);
        setNextPageId(nextPageId + 1);
    }

    const addPage = () => {
        // create page
        setPages((pages) => [...pages, { folderId: currFolder, id: nextPageId, name: 'New Page' }]);

        // increment page id
        setNextPageId(nextPageId + 1);
    }

    const addNote = (event) => {
        if (event.target.className == 'section-blackboard') {
            const x = event.nativeEvent.offsetX;
            const y = event.nativeEvent.offsetY;
            setNotes((prevNotes) => [...prevNotes, { pageId:currPage, id: nextNoteId, x: x, y: y, text: '' }]);
            // increment nextNoteId
            setNextNoteId(nextNoteId + 1);
        }
    }

    const deleteNote = (event) => {
        if (event.target.className == 'div-note-delete') {
            const idToDelete = event.target.getAttribute('id')
            setNotes(notes.filter(note => note.id != idToDelete));
        }
    }

    return (
        <main className="main-notes">
            <section className="section-notes">
                <h4 style={{ textAlign: "center", marginTop: "5px" }}>Folders</h4>
                <ul className="ul-notes">
                    {folders.map((folder, index) => {
                        return (<Folder key={folder.id} selectFolderFunc={setSelectedFolder} renameFolderFunc={renameFolder} id={folder.id} name={folder.name} />);
                    })}
                    <li className='btn btn-green' onClick={addFolder}>Add folder</li>
                </ul>
            </section>
            <section className="section-notes">
                <h4 style={{ textAlign: "center", marginTop: "5px" }}>Pages</h4>
                <ul className="ul-notes">
                    {pages
                        .filter((page, index) => page.folderId === currFolder)
                        .map((page, index) => {
                            return (<Page key={page.id} selectPageFunc={setSelectedPage} renamePageFunc={renamePage} folderId={page.folderId} id={page.id} name={page.name} />);
                        })}
                    <li className='btn btn-green' onClick={addPage}>Add page</li>
                </ul>
            </section>
            <section className="section-blackboard" onClick={(event) => { addNote(event); deleteNote(event) }}>
                {notes
                    .filter((note, index) => note.pageId === currPage)
                    .map((note, index) => {
                    return (<Note key={note.id} id={note.id} x={note.x} y={note.y} text={note.text} />);
                })}
            </section>
        </main>
    )
}

function Folder({ selectFolderFunc, renameFolderFunc, id, name }) {
    const folderId = id;
    const [folderName, setName] = useState(name);

    const [readOnly, setReadOnly] = useState(false);
    const rename = (event) => {
        setName(event.target.value);
    }
    const finishRename = (event) => {
        if (event.key === 'Enter') {
            setReadOnly(true);
            renameFolderFunc(folderId, event.target.value);
            selectFolderFunc(folderId);
        }
    }

    function sendSelectedFolder() {
        if (readOnly == true) {
            selectFolderFunc(folderId);
        }
    }

    return (
        <li className='li-notes'><input className='input-txt' onClick={sendSelectedFolder} onChange={rename} onKeyDown={finishRename} readOnly={readOnly} value={folderName} /></li>
    )
}

function Page({ selectPageFunc, renamePageFunc, folderId, id, name }) {
    const pageId = id;
    const [pageName, setName] = useState(name);

    // rename page
    const [readOnly, setReadOnly] = useState(false);
    const rename = (event) => {
        setName(event.target.value);
    }

    const finishRename = (event) => {
        if (event.key === 'Enter') {
            setReadOnly(true);
            renamePageFunc(pageId, event.target.value);
            selectPageFunc(pageId);
        }
    }

    function sendSelectedPage() {
        if (readOnly == true) {
            selectPageFunc(pageId);
        }
    }

    return (
        <li className='li-notes'><input className='input-txt' onClick={sendSelectedPage} onChange={rename} onKeyDown={finishRename} readOnly={readOnly} value={pageName} /></li>
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
