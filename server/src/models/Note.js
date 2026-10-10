const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true,
    }
},
    {
        timestamps: true
    })

module.exports = mongoose.model("Note", noteSchema);
