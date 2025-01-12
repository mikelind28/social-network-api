import { Router } from 'express';
const router = Router();
import {

} from '../../controllers/thoughtController.js';

// /api/thoughts
router.route('/')
    // get all thoughts
    .get()
    // post a new thought; push its _id to associated user's thought array
    .post();

// /api/thoughts/:thoughtId
router.route('/:thoughtId')
    // get a single thought by its _id
    .get()
    // update a thought by its _id
    .put()
    // delete a thought by its _id
    .delete();

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
    // post a reaction to a single thought's reactions array
    .post()
    // delete a reaction by its _id
    .delete()

export { router as thoughtRouter };