const express = require("express");
const app = express();
const noteRouter = require("./note.route")
app.use(express.json());

app.use("/api/notes", noteRouter)

module.exports = app