const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
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

module.exports = mongoose.model("User", userSchema);
