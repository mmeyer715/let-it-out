const { ObjectId } = require('bson');
const { Schema, model } = require('mongoose');

// Creating reaction schema
const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: new ObjectId
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
        createdAt:{
            type: Date,
            default: Date.now
        }
    }
);

module.exports = ReactionSchema;