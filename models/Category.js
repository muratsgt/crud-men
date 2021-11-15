const mongoose = require("mongoose");
const defaultSchemaProps = require("../helper/defaultSchemaProps");

const schema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true,
    },
    description: {
        type: String,
    },
    ...defaultSchemaProps
});

module.exports = Category = mongoose.model("Category", schema);