const { User } = require('../models');

const userController = {
    /* api/users */
// GET all users
    getAllUsers(req, res) {
        User.find({})
        .then(userData => res.json(userData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
// GET a single user by it's _id and pupulated thought and friend data
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .then(userData => {
            // if no user if found, send 404
            if (!userData) {
                res.status(404).json({ message: 'No user found with this id!'});
                return;
            }
            res.json(userData);
        })
        .catch(err => {
            console.log(err);
            res.status(404).json(err);
        });
    },

// POST a new user
    createUser(req, res) {
        User.create(req.body)
            .then((userData) => {
                res.status(200).json(userData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
// PUT to update  a user by its _id
    updateUserbyId({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id}, body, { new: true})
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: 'No user found with this id!'});
                return;
            }
            res.json(userData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        });
    },
// DELETE to remove user by its _id
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: 'No user found with this id!'});
                return;
            }
            res.json(userData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        });
    }
// ***BONUS*** remove a user's associated thoughts when deleted

/* /api/users/:userId/friends/:friendId */

// POST to add a new friend to a user's friend list
// DELETE to remove a friend from a user's friend list
}

module.exports = userController;