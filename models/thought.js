const { Schema, model } = require('mongoose');


// creating thought schema
const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

// creating reactionCount virtual
ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

// creating though model
const Thought = model('Thought', ThoughtSchema);

// exporting model
module.exports = Thought;