const { User, Thought } = require('../models');

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
                res.status(200).json({message: 'User created successfully!'})
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
            res.status(200).json({message: 'User updated successfully'});
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
            res.json({message: 'User deleted successfully!'});
            return Thought.deleteMany({ username: userData.username })
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        });
    },
// ***BONUS*** remove a user's associated thoughts when deleted

// POST to add a new friend to a user's friend list
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $addToSet: { friends: params.friendId }},
            { new: true, runValidators: true }
        )
        .then(userData => {
            if(!userData) {
                res.status(404).json({ message: 'No user found with this id!'});
                return;
            }
            res.json({message: 'Friend added Successfully!'});
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({ message: 'No friend found with this id!'});
        });
    },

    // DELETE to remove a friend from a user's friend list
    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId }},
            { new: true }
        )
        .then(userData => {
            if(!userData) {
                res.status(404).json({ message: 'No user found with this id'});
                return;
            }
            res.json({ message: 'Friend deleted successfully!'});
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    }
}

module.exports = userController;