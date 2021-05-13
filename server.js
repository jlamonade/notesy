const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
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

  console.log(note);
});

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
