const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "../../index.html"))
);

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "../../notes.html"))
);

app.get("/api/notes", (req, res) => res.sendFile(path.join(__dirname, "../../../db/db.json")));



app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
