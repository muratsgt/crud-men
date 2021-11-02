const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true,
    },
    status: {
        type: String,
        default: "created",
    },
    description: {
        type: String,
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
    dateUpdated: {
        type: Date,
    },
    dateDeleted: {
        type: Date,
    }
});

module.exports = Category = mongoose.model("Category", schema);