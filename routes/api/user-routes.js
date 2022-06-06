const router = require('express').Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUserbyId,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller');

// Set up GET all and POST at /api/users
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

// Set up GET one, PUT, and DELETE at /api/users/:id
router
    .route('/:id')
    .get(getUserById)
    .put(updateUserbyId)
    .delete(deleteUser);

// SET up POST /api/users/:userId/friends/:friendId */
router
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);

module.exports = router;