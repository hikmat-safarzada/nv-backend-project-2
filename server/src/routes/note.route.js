const express = require("express");
const { getNotes, getNoteById, createNote,
    updateNote, deleteNote } = require("../controllers/note.controller");
const router = express.Router();

router.get("/", getNotes);
router.get("/:userId", getNoteById);
router.post("/", createNote)
router.patch("/:noteId", updateNote)
router.delete("/:noteId", deleteNote)

module.exports = router