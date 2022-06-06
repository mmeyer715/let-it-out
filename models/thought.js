const { Schema, model, Types } = require('mongoose');

// creating reaction schema
const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (date) => {
                if (date) return date.toISOString().split("T")[0];
            },
        }
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        }
    }
);


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
            default: Date.now,
            get: (date) => {
                if (date) return date.toISOString().split("T")[0];
            },
        },
        username: {
            type: String,
            required: true
        },
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
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
module.exports = Thought, ReactionSchema;