

const Note = require("../models/Note")

const getNotes = async (req, res) => {
    try {
        const notes = await Note.find();
        res.status(200).json({
            message: "Notes",
            notes
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const getNoteById = async (req, res) => {
    try {
        const { noteId } = req.params;
        const note = await Note.findOne({ _id: noteId })
        if(!note){
            return res.status(404).json({
                message: "Note Not Found"
            })
        }
        res.status(200).json({note})
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const createNote = async (req, res) => {
    try {
        const {username, topic, text} = req.body;
        const newNote = await Note.create({
            username,
            topic,
            text
        })
        res.status(201).json({
            message: "Note created successfully!",
            newNote
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const updateNote = async (req, res) => {
    try {
        const {noteId} = req.params;
        const note = await Note.findOne({_id: noteId});
        if(!note){
            return res.status(404).json({
                message: "Note not found."
            })
        }
        const allowedFields = [
            "topic",
            "text"
        ]
        const updates = Object.fromEntries(
            Object.entries(req.body).filter(
                ([key]) => allowedFields.includes(key)
            )
        )
        Object.assign(note, updates)
        await note.save();
        res.status(200).json({
            message: "Note updated successfully!",
            user
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const deleteNote = async (req, res) => {
    try {
        const {noteId} = req.params;
        const deletedNote = await Note.findByIdAndDelete(noteId);
        if(!deletedNote){
            return res.status(404).json({
                message: "No Note Found"
            })
        }
        res.status(200).json({
            message: "Note deleted successfully",
            deletedNote
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    getNotes, getNoteById, createNote,
    updateNote, deleteNote
}