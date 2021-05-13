const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); // asset files need to be served statically
app.use(express.json());

// route to root
app.get("/", (req, res) => { 
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

// route to notes.html
app.get("/notes", (req, res) => 
  res.sendFile(path.join(__dirname, "./public/notes.html"))
);

// route to access db
app.get("/api/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "./db/db.json"))
);

// route to write notes
app.post("/api/notes", (req, res) => {
  const note = req.body; // note object being sent to server 
  fs.readFile("./db/db.json", (err, data) => { // reads db.json
    if (err) throw err;
    let notesArr = JSON.parse(data); // parses the json into an array
    notesArr.push(note); // adds the note obj to array
    fs.writeFile("./db/db.json", JSON.stringify(notesArr), (err) => {
      // updates db.json with the new values
      if (err) throw err;
    });
  });
  res.json(note);
});

// route to delete notes
app.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id; // takes in note id
  fs.readFile("./db/db.json", (err, data) => {
    if (err) throw err;
    const notesArr = JSON.parse(data); // parses the new array and returns an array
    for (let i = 0; i < notesArr.length; i++) {
      // if note with id exists, remove it from array
      if (notesArr[i].id === id) {
        notesArr.splice(i, 1);
      }
    }
    fs.writeFile("./db/db.json", JSON.stringify(notesArr), (err) => {
      // update the db with new array
      if (err) throw err;
    });
  });
  res.send("Delete successful");
});

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
