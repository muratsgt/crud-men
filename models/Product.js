const mongoose = require('mongoose');
const {Schema} = mongoose;

const schema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
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
    dateCreated: {
        type: Date,
        default: Date.now,
    },
    dateUpdated: {
        type: Date,
    },
    dateDeleted: {
        type: Date,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
    },
    status: {
        type: String,
        default: "created"
    },
});

module.exports = Product = mongoose.model("Product", schema);