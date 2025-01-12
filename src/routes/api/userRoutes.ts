import { Router } from 'express';
const router = Router();
import {

} from '../../controllers/userController.js';

// /api/users
router.route('/')
    // get all users
    .get()
    // post new user
    .post();

// /api/users/:userId
router.route('/:userId')
    // get single user by _id, with populated thought and friend data
    .get()
    // update user by _id
    .put()
    // remove user by _id
    .delete();

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
    // post new friend to a user's friend list
    .post()
    // remove a friend from a user's friend list
    .delete();

export { router as userRouter };