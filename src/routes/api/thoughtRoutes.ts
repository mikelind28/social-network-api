import { Router } from 'express';
const router = Router();
import {
    getAllThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    newReaction,
    deleteThoughtReaction,
} from '../../controllers/thoughtController.js';

// /api/thoughts
router.route('/')
    // get all thoughts
    .get(getAllThoughts)
    // post a new thought; push its _id to associated user's thought array
    .post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId')
    // get a single thought by its _id
    .get(getSingleThought)
    // update a thought by its _id
    .put(updateThought)
    // delete a thought by its _id
    .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
    // post a reaction to a single thought's reactions array
    .post(newReaction)

router.route('/:thoughtId/reactions/:reactionId')
    // delete a reaction by its reactionId value
    .delete(deleteThoughtReaction)


export { router as thoughtRouter };