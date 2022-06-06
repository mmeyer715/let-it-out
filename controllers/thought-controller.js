const { Thought, User } = require('../models');

const thoughtController = {
    // GET to get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .then(thoughtData => res.json(thoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // GET to get a single thought by its _id
    getThoughtsById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'No thought with this id!' });
                    return;
                }
                res.json(thoughtData)
            })
            .catch(err => {
                console.log(err);
                res.status(404).json(err);
            });
    },
    // POST to create a new thought 
    createThought({ body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                )
            })
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.status(200).json({message: 'Thought created successfully!'});
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // PUT to update a thought by its _id
    updateThoughtById({ params, body }, res) {
        Thought.findByIdAndUpdate({ _id: params.id}, body, {new: true})
        .then(thoughtData => {
            if (!thoughtData) {
                res.status(404).json({ message: 'No thought found with this id!'});
                return;
            }
            res.json({message: 'Thought updated successfully!'});
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    // DELETE to remove a thought by its _id
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then(thoughtData => {
            if (!thoughtData) {
                res.status(404).json({ message: 'No thought found with this id!'});
                return;
            }
            res.json({ message: 'Thought deleted successfully!'});
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // POST to create a reaction stored in a single thought's reactions array field
    createReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $addToSet: { reactions: body} },
            { new: true, runValidators: true }
        )
        .then(thoughtData => {
            if (!thoughtData) {
                res.status(404).json({ message: 'No thought found with this id!'});
                return;
            }
            res.status(200).json({ message: 'Reaction created successfully!'});
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    // DELETE to pull and remove a reaction by the reaction's reactionId value
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId}}},
            { new: true}
        )
        .then(thoughtData => {
            res.json({message: 'Reaction removed scessfully!'});
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    }
};

module.exports = thoughtController;