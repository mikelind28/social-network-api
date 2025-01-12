import { Thought, User } from '../models/index.js';
import { Request, Response } from 'express';

// GET all thoughts at /api/thoughts
export const getAllThoughts = async (_req: Request, res: Response) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (error) {
        res.status(500).json(error);
    }
}

// GET single thought by its _id at /api/thoughts/:thoughtId
export const getSingleThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOne({ _id: req.params.postId });

        if (!thought) {
        res.status(404).json({ message: 'No Thought with that ID.' });
        } else {
        res.json(thought);
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

// POST a new thought at /api/thoughts
export const createThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.create(req.body);
        const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thought._id } },
        { new: true }
        );

        if (!user) {
            res.status(404).json({ message: 'Thought created, but no user with that ID.' });
        } else {  
        res.json('Created new Thought.');
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

// PUT update a thought by its _id at /api/thoughts/:thoughtId
export const updateThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.body.thoughtId },
            { $set: req.body },
        )

        if (!thought) {
            res.status(400).json({message: 'No Thought with this ID.' });
        } else {
            res.json(thought);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

// DELETE a thought by its _id at /api/thoughts/:thoughtId
export const deleteThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

        if (!thought) {
            res.status(404).json({ message: 'No Thought with that ID.'} );
        } else {
            res.json({ message: 'Thought deleted.'} ); 
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

// POST a reaction in a thought's reactions array at /api/thouhgts/:thoughtId/reactions
export const newReaction = async (_req: Request, res: Response) => {
    try {

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}