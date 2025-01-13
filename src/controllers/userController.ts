import { Request, Response } from 'express';
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
            { new: true }
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
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params;
    try {
        const user = await User.findOneAndDelete({ _id: userId });

        if (!user) {
            res.status(404).json({ message: 'There is no user with this ID.' });
        } else {
            await Thought.deleteMany({ _id: { $in: user.thoughts } });
            res.json({ message: `User ${user.username} deleted.` });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

// POST new User (friend) to a User's friend list at /api/users/:userId/friends/:friendId
export const addFriend = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { new: true }
        );

        if (!user) {
            res.status(400).json({ message: 'There is no user with this ID.'});
        }

        res.json(user);
    } catch (error) {
        res.status(500).json(error);
    }
}

// DELETE User (friend) from a User's friend list at /api/users/:userId/friends/:friendId
export const removeFriend = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        );

        if (!user) {
            res.status(400).json({ message: 'There is no user this this ID.'})
        }

        res.json(user);
    } catch (error) {
        res.status(500).json(error);
    }
}