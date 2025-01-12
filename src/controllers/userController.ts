import { Request, Response } from 'express';
// import { ObjectId } from 'mongodb';
import { User, Thought } from '../models/index.js';

// GET all Users at /api/users
export const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
}

// GET single User at /api/users/:userId
export const getSingleUser = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId)
            .populate(['thoughts', 'friends']);

        if(!user) {
            res.status(404).json({ message: 'No user with that ID.' });
        } else {
            res.json(user);
        }
    } catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
}

// POST new User at /api/users
export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (error: any) {
        res.status(500).json(error);
    }
}

// PUT update User by _id at /api/users/:userId
export const updateUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },

        );

        if (!user) {
            res.status(400).json({message: 'No user with this id!' });
        } else {
            res.json(user);
        }
    } catch (error: any) {
        res.status(400).json({
            message: error.message
        });
    }
}

// DELETE User by _id at /api/user/:userId
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.userId });

        if (!user) {
            return res.status(404).json({ message: 'There is no user with this ID.' });
        }

        const thoughts = await Thought.findOneAndUpdate(
            { users: req.params.userId },
            { $pull: { users: req.params.userId } },
            { new: true }
        );

        if (!thoughts) {
            return res.status(404).json({
                message: 'User deleted, but no Thoughts found.',
            });
        }

        return res.json({ message: 'User deleted.' });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}

// POST new User (friend) to a User's friend list at /api/users/:userId/friends/:friendId
export const addFriend = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndUpdate(
            {_id: req.params.userId },
            { $addToSet: { friends: req.body } },
            
        );

        if (!user) {
            return res.status(400).json({ message: 'There is no user with this ID.'});
        }

        return res.json(user);
    } catch (error) {
        return res.status(500).json(error);
    }
}