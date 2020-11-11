
const fs = require("fs");
const { nanoid } = require("nanoid");
let notes = require("../db/db.json")
module.exports = function (app) {

    // Displays note data
    app.get("/api/notes", (req, res) => {
        fs.readFile("db/db.json", "utf8", (err, data) => {
            if (err) throw err;
            var notes = JSON.parse(data);
            res.json(notes);
        });
    });

    // adds route
    app.post("/api/notes", (req, res) => {
        let newNote = req.body;
        newNote.id = nanoid();
        // (notes.length === 0)
        notes.push(newNote);
        updateDb();
        console.log("Added new note " + newNote.title)
        res.json({ success: true })
    });

    app.get("/api/notes/:id", function (req, res) {
        res.json(notes[req.params.id]);
    });

    // deletes route
    app.delete("/api/notes/:id", (req, res) => {
        for (var i = 0; i < notes.length; i++) {
            if (notes[i].id === req.params.id) {
                notes.splice(i, 1);
            }
        }
        updateDb();
        console.log("Deleted note " + req.params.id);

        res.json({ success: true });
    });

    function updateDb() {
        fs.writeFile("db/db.json", JSON.stringify(notes), err => {
            if (err) throw err;
            return true;
        });
    }
};

