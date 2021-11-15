module.exports = defaultSchemaProps = {
    status: {
        type: String,
        default: "created",
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
};

