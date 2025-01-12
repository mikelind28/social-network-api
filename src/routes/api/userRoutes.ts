import { Router } from 'express';
const router = Router();
import {
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} from '../../controllers/userController.js';

// /api/users
router.route('/')
    // get all users
    .get(getAllUsers)
    // post new user
    .post(createUser);

// /api/users/:userId
router.route('/:userId')
    // get single user by _id, with populated thought and friend data
    .get(getSingleUser)
    // update user by _id
    .put(updateUser)
    // remove user by _id
    .delete(deleteUser);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
    // post new friend to a user's friend list
    .post(addFriend)
    // remove a friend from a user's friend list
    .delete(removeFriend);

export { router as userRouter };