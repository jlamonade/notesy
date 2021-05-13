const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
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
  const note = req.body;
  fs.readFile("./db/db.json", (err, data) => {
    if (err) throw err;
    let notesArr = JSON.parse(data);
    notesArr.push(note);
    fs.writeFile("./db/db.json", JSON.stringify(notesArr), (err) => {
      if (err) throw err;
    });
  });
  console.log(note);
  res.json(note);
});

// route to delete notes
app.delete("/api/notes/:id", (req, res) => {
  
})

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
