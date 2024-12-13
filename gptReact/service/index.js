

const config = require('./gpt_api_key.json');

// allow code to select a port to run on based on the command line parameters
const port = process.argv.length > 2 ? process.argv[2] : 4000;

const express = require('express');
const uuid = require('uuid');
const app = express();
const bcrypt = require('bcrypt');
const OpenAI = require('openai');
const fs = require('fs');
const DB = require('./database.js');

// Serve up the front-end static content hosting
app.use(express.static('public'));

// JSON body parsing using built-in middleware
app.use(express.json());

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);


// send folders, pages, and notes
apiRouter.post("/notesGet", async (req, res) => {
    const userName = req.body.userName;
    const data = await DB.getDataByUsername(userName);
    if (!data) {
        res.send({
            folders: [{ id: 0, name: 'New Folder', readOnly: false }],
            pages: [{ folderId: 0, id: 0, name: 'New Page', readOnly: false }],
            notes: [{ pageId: 0, id: 0, x: 0, y: 0, text: '' }],
        })
    } else {
        res.send({
            folders: data.folders,
            pages: data.pages,
            notes: data.notes,
        });
    }

});

// save folders, pages, and notes
apiRouter.post("/notes", async (req, res) => {
    const userName = req.body.userName
    if (!userName | userName === '') {
        res.status(409).send({ msg: "Not logged in" });
    } else {
        const data = {
            userName: userName,
            folders: req.body.folders,
            pages: req.body.pages,
            notes: req.body.notes,
        }
        await DB.setDataByUsername(data);
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

// CreateAuth token for a new user
apiRouter.post('/auth/create', async (req, res) => {
    console.log('ree: ', typeof(DB.getUser));
    if (await DB.getUser(req.body.userName)) {
        res.status(409).send({ msg: 'Existing user' });
    } else {
        const user = await DB.createUser(req.body.userName, req.body.password);

        // Set the cookie
        // setAuthCookie(res, user.token);

        res.send({
            id: user._id,
        });
    }
});


// GetAuth token for the provided credentials
apiRouter.post('/auth/login', async (req, res) => {
    console.log('ree: ', typeof(DB.getUser));
    const user = await DB.getUser(req.body.userName);
    if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
            // setAuthCookie(res, user.token);
            res.send({ id: user._id });
            return;
        }
        else {
            res.status(401).send({ msg: 'Incorrect username or password.' });
        }
    }
    res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth token if stored in cookie
apiRouter.delete('/auth/logout', (_req, res) => {
    res.status(204).end();
});


// Return the application's default page if the path is unknown
app.use((_req, res) => {
    res.sendFile("index.html", { root: "public" });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
