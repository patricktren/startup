// allow code to select a port to run on based on the command line parameters
const port = process.argv.length > 2 ? process.argv[2] : 4000;

const express = require('express');
const uuid = require('uuid');
const app = express();

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



