const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtsById,
    createThought,
    updateThoughtById,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thought-controller');

// Set up GET all and POST at /api/thoughts
router
    .route('/')
    .get(getAllThoughts)
    .post(createThought)

// Set up GET one, PUT, and DELETE at /api/thoughts/:id
router
    .route('/:id')
    .get(getThoughtsById)
    .put(updateThoughtById)
    .delete(deleteThought);

router
    .route('/:thoughtId/reactions')
    .post(createReaction)

router
    .route(':/thoughtId/reactions/:reactionId')
    .delete(deleteReaction);

module.exports = router;