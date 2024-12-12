

const config = require('./gpt_api_key.json');

// allow code to select a port to run on based on the command line parameters
const port = process.argv.length > 2 ? process.argv[2] : 4000;

const express = require('express');
const uuid = require('uuid');
const app = express();
const OpenAI = require('openai');
const fs = require('fs');

// Serve up the front-end static content hosting
app.use(express.static('public'));

// JSON body parsing using built-in middleware
app.use(express.json());

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// These data are saved in memory and disappear whenever the service is restarted.
let users = {};

// each of these will have the username as the key and the list of items as the value
let folders = {};
let pages = {};
let notes = {};

// send folders, pages, and notes
apiRouter.post("/notesGet", async (req, res) => {
    const userName = req.body.userName;
    if (!(userName in folders) || folders[userName].length == 0) {
        folders[userName] = [ {id: 0, name: 'New Folder', readOnly: false} ];
        pages[userName] = [ {folderId: 0, id: 0, name: 'New Page', readOnly: false} ];
        notes[userName] = [ {pageId: 0, id: 0, x: 0, y: 0, text: ''} ];
    }
    res.send({
        folders: folders[userName],
        pages: pages[userName],
        notes: notes[userName],
    });
});

// save folders, pages, and notes
apiRouter.post("/notes", async (req, res) => {
    const userName = req.body.userName
    if (!userName | userName === '') {
        res.status(409).send({ msg: "Existing user" });
    } else {
        folders[userName] = req.body.folders;
        pages[userName] = req.body.pages;
        notes[userName] = req.body.notes;
    }
});

// chatgpt call
const OPENAI_API_KEY = config.API_KEY;
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

apiRouter.post("/gpt", async (req, res) => {
    const prompt = req.body.prompt;

    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            {
                role: "user",
                content: prompt,
            },
        ],
    });
    res.send({ gptResponse: completion.choices[0].message });
});

// CreateAuth a new user
apiRouter.post("/auth/create", async (req, res) => {
    const user = users[req.body.email];
    if (user) {
        res.status(409).send({ msg: "Existing user" });
    } else {
        const user = {
            email: req.body.email,
            password: req.body.password,
            token: uuid.v4(),
        };
        users[user.email] = user;

        res.send({ token: user.token });
    }
});


// GetAuth login an existing user
apiRouter.post("/auth/login", async (req, res) => {
    const user = users[req.body.email];
    if (user) {
        if (req.body.password === user.password) {
            user.token = uuid.v4();
            res.send({ token: user.token });
            return;
        }
    }
    res.status(401).send({ msg: "Unauthorized" });
});

// DeleteAuth logout a user
apiRouter.delete("/auth/logout", (req, res) => {
    const user = Object.values(users).find((u) => u.token === req.body.token);
    if (user) {
        delete user.token;
    }
    res.status(204).end();
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
    res.sendFile("index.html", { root: "public" });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
