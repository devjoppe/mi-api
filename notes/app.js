import express from 'express';
// Why did I need a body parser?
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json())

import {getNote, getNotes, createNote} from "./database.js";

app.listen(3000, () => {
    console.log('Server started on port 3000');
});

// All notes
app.get("/notes", async (req, res) => {
    const notes = await getNotes();
    res.send(notes);
});

// Single note
// Using parameters
app.get("/notes/:id", async (req, res) => {
    const paramId = req.params.id;
    const note = await getNote(paramId);
    res.send(note);
});

// Create note
app.post("/notes", async (req, res) => {
    // Pass title and content to body
    console.log(req.body);
    const {title, content} = req.body;
    const note = await createNote(title, content);
    res.send(note);
});

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

