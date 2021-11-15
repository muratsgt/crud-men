const mongoose = require('mongoose');
const defaultSchemaProps = require("../helper/defaultSchemaProps");
const { Schema } = mongoose;

const schema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 200
    },
    description: {
        type: String,
        maxlength: 5000,
    },
    imageUrl: {
        type: String,
        default: "https://via.placeholder.com/250x250.png?text=No+Image",
    },
    unitPrice: {
        type: Number,
        default: 0,
        min: 0,
    },
    quantity: {
        type: Number,
        default: 0,
        min: 0,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
    },
    ...defaultSchemaProps
});

module.exports = Product = mongoose.model("Product", schema);