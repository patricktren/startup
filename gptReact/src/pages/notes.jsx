import React, { useState } from 'react';

import Draggable from 'react-draggable';


import "../css/main.css";
import folder_image from '../images/folder.png';

export function Notes({ userName }) {

    // const [folders, setFolders] = useState([ {id: 0, name: 'New Folder', readOnly: false} ]);
    // const [pages, setPages] = useState([ {folderId: 0, id: 0, name: 'New Page', readOnly: false} ]);
    // const [notes, setNotes] = useState([ {pageId: 0, id: 0, x: 0, y: 0, text: ''} ]);
    
    const [folders, setFolders] = useState([]);
    const [pages, setPages] = useState([]);
    const [notes, setNotes] = useState([]);
    
    console.log('notes: ',notes);

    const [dataRefreshed, setDataRefreshed] = useState(false);

    // next folder id
    const [nextFolderId, setNextFolderId] = useState(1);

    // next page id
    const [nextPageId, setNextPageId] = useState(1);

    // next note id
    const [nextNoteId, setNextNoteId] = useState(1);

    // current folder/page
    const [currFolder, setCurrFolder] = useState(0);
    const [currPage, setCurrPage] = useState(0);

    function setSelectedFolder(folderId) {
        setCurrFolder(folderId);
        setSelectedPage(pages.filter((page) => page.folderId === folderId)[0].id)
    }

    function setSelectedPage(pageId) {
        setCurrPage(pageId);
    }

    function renameFolder(folderId, newFolderName) {
        setFolders(folders.map((folder) => folder.id == folderId ? {...folder, name: newFolderName, readOnly: true} : folder));
        setSelectedFolder(folderId);
    }

    function renamePage(pageId, newPageName) {
        setPages(pages.map((page) => page.id == pageId ? {...page, name: newPageName, readOnly: true} : page));
        setSelectedPage(pageId);
    }

    const addFolder = () => {
        // create folder
        setFolders((folders) => [...folders, { id: nextFolderId, name: 'New Folder', readOnly: false }]);

        // initialize first page
        setPages((pages) => [...pages, { folderId: nextFolderId, id: nextPageId, name: 'New Page', readOnly: false }]);

        // increment id's
        setNextFolderId(nextFolderId + 1);
        setNextPageId(nextPageId + 1);
    }

    const addPage = () => {
        // create page
        setPages((pages) => [...pages, { folderId: currFolder, id: nextPageId, name: 'New Page', readOnly: false }]);

        // increment page id
        setNextPageId(nextPageId + 1);
    }

    const addNote = (event) => {
        if (event.target.className == 'section-blackboard') {
            const x = event.nativeEvent.offsetX;
            const y = event.nativeEvent.offsetY;
            if (notes.length > 0) {
                setNotes((prevNotes) => [...prevNotes, { pageId:currPage, id: nextNoteId, x: x, y: y, text: '' }]);
            } else {
                setNotes([ { pageId:currPage, id: nextNoteId, x: x, y: y, text: '' } ])
            }
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

    function updateNote(pageId, id, x, y, text) {
        setNotes(notes.map((note) => note.id == id ? {...note, x:x, y:y, text:text} : note));
        console.log(text);
    }

    React.useEffect(() => {
        fetch("api/notesGet", {
            method: 'post',
            body: JSON.stringify({
                userName: userName,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then((response) => response.json())
        .then((data) => {
            if (Object.keys(data).length > 0) {
                setFolders(data.folders);
                setPages(data.pages);
                setNotes(data.notes);
            }
        });
    }, []);

    return (
        <main className="main-notes">
            <section className="section-notes">
                <h4 style={{ textAlign: "center", marginTop: "5px" }}>Folders</h4>
                <ul className="ul-notes">
                    {folders && folders.map((folder, index) => {
                        return (<Folder key={folder.id} selectFolderFunc={setSelectedFolder} renameFolderFunc={renameFolder} id={folder.id} name={folder.name} readOnly={folder.readOnly} />);
                    })}
                    <li className='btn btn-green' onClick={addFolder}>Add folder</li>
                </ul>
            </section>
            <section className="section-notes">
                <h4 style={{ textAlign: "center", marginTop: "5px" }}>Pages</h4>
                <ul className="ul-notes">
                    {pages && pages
                        .filter((page, index) => page.folderId === currFolder)
                        .map((page, index) => {
                            return (<Page key={page.id} selectPageFunc={setSelectedPage} renamePageFunc={renamePage} folderId={page.folderId} id={page.id} name={page.name} readOnly={page.readOnly} />);
                        })}
                    <li className='btn btn-green' onClick={addPage}>Add page</li>
                </ul>
            </section>
            <section className="section-blackboard" onClick={(event) => { addNote(event); deleteNote(event) }}>
                <button onClick={() => saveNotes(userName, folders, pages, notes)} className="btn btn-green">Save Notes</button>
                {notes && notes
                    .filter((note, index) => note.pageId === currPage)
                    .map((note, index) => {
                    return (<Note key={note.id} updateNoteFunc={updateNote} id={note.id} x={note.x} y={note.y} text={note.text} />);
                })}
            </section>
        </main>
    )
}

function Folder({ selectFolderFunc, renameFolderFunc, id, name, readOnly }) {
    const folderId = id;
    const [folderName, setName] = useState(name);

    const [readOnlyState, setReadOnly] = useState(readOnly);
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
        if (readOnlyState == true) {
            selectFolderFunc(folderId);
        }
    }

    return (
        <li className='li-notes'><input className='input-txt' onClick={sendSelectedFolder} onChange={rename} onKeyDown={finishRename} readOnly={readOnlyState} value={folderName} /></li>
    )
}

function Page({ selectPageFunc, renamePageFunc, folderId, id, name, readOnly }) {
    const pageId = id;
    const [pageName, setName] = useState(name);

    // rename page
    const [readOnlyState, setReadOnly] = useState(readOnly);
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
        if (readOnlyState == true) {
            selectPageFunc(pageId);
        }
    }

    return (
        <li className='li-notes'><input className='input-txt' onClick={sendSelectedPage} onChange={rename} onKeyDown={finishRename} readOnly={readOnlyState} value={pageName} /></li>
    )
}

function Note({ updateNoteFunc, pageId, id, x, y, text }) {
    const [position, setPosition] = useState({ x: x, y: y })

    const drag = (event, data) => {
        setPosition({ x: data.x, y: data.y });
        updateNoteFunc(pageId, id, position.x, position.y, content);
    }

    const [content, updateContent] = useState(text);

    const contentChange = (event) => {
        updateContent(event.target.value);
        updateNoteFunc(pageId, id, x, y, event.target.value);
    }

    async function gptCall(event) {
        if (event.key === 'Enter' && event.ctrlKey) {
            const prompt = content;
            updateContent(content + '\n\n' + "Getting Chat's response...");

            const gptResponse = await gpt(prompt);
            updateContent(prompt + '\n\n' + gptResponse);
            updateNoteFunc(pageId, id, x, y, prompt + '\n\n' + gptResponse);
        }
    }

    return (
        <Draggable handle='.div-note-grabber' bounds='parent' position={position} onDrag={drag}>
            <div className="div-note">
                <div className="div-note-grabber">....<span id={id} className='div-note-delete'>x</span></div>
                <textarea className="input-note-textarea" onKeyDown={event => gptCall(event)} onChange={contentChange} value={content} placeholder="Write your query here and press 'ctrl + enter' to send it." />
            </div>
        </Draggable>
    )
}

async function getNotes(userName, setData) {
    const response = await fetch("api/notes", {
        method: 'get',
        body: JSON.stringify({
            userName: userName,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });
    if (response?.status === 200) {
        setData(response.folders.content, response.pages.content, response.notes.content);
        console.log(response.folders.content);
    } else {
        console.log(response.status);
        const body = await response.json();
        console.log(`⚠ Error: ${body.msg}`);
        // return "There was an error.";
    }
}

async function saveNotes(userName, folders, pages, notes) {
    const response = await fetch("api/notes", {
        method: 'post',
        body: JSON.stringify({
            userName: userName,
            folders: folders,
            pages: pages,
            notes: notes
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });
}

async function gpt(userPrompt) {
    const response = await fetch("api/gpt", {
        method: 'post',
        body: JSON.stringify({ prompt: userPrompt }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });
    if (response?.status === 200) {
        console.log(response.status);
        const gptResponse = await response.json();
        console.log(gptResponse);
        return gptResponse.gptResponse.content;
    } else {
        console.log(response.status);
        const body = await response.json();
        console.log(`⚠ Error: ${body.msg}`);
        return "There was an error.";
    }

}