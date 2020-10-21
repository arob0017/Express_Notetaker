
const fs = require("fs");
let notes = require("../db/db.json")
module.exports = function (app) {
    fs.readFile("db/db.json", "utf8", (err, data) => {
        if (err) throw err;

        var notes = JSON.parse(data);
        // Displays note data
        app.get("/api/notes", (req, res) => {
            res.json(notes);
        });

        // adds route
        app.post("/api/notes", (req, res) => {
            let newNote = req.body;
            // (notes.length === 0)
            notes.push(newNote);
            updateDb();
            return console.log("Added new note " + newNote.title)

        });

        // Retrieves a note with specific id
        app.get("/api/notes/:id", function (req, res) {
            // display json for the notes array indices of the provided id
            res.json(notes[req.params.id]);
        });

        // deletes route
        app.delete("/api/notes/:id", (req, res) => {
            notes.splice(req.params.id, 1);
            updateDb();
            console.log("Deleted note" + req.params.id);

            // res.json({ success: true });
        });

        // updates the json file anytime something is added or deleted
        function updateDb() {
            fs.writeFile("db/db.json", JSON.stringify(notes, '\t'), err => {
                if (err) throw err;
                return true;
            });
        }
    });
};

