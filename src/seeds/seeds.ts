import { Document } from 'mongoose';
import { User } from '../models/index.js';
import { Thought } from '../models/index.js';

const thought1 = new Thought({
    thoughtText: "This is thought1.",
    username: "username1",
    reactions: [{
        reactionBody: "This is reaction1."
    }]
});

const thought2 = new Thought({
    thoughtText: "This is thought2.",
    username: "username2",
    reactions: [{
        reactionBody: "This is reaction2."
    }]
});

const thought3 = new Thought({
    thoughtText: "This is thought3.",
    username: "username3",
    reactions: [{
        reactionBody: "This is reaction3."
    }]
});

const user1 = new User({
    username: "username1",
    email: "user1@example.com",
    thoughts: [thought1._id],
    friends: []
});

const user2 = new User({
    username: "username2",
    email: "user2@example.com",
    thoughts: [thought2._id],
    friends: []
});

const user3 = new User({
    username: "username3",
    email: "user3@example.com",
    thoughts: [thought3._id],
    friends: []
});

const thoughts: Document[] = []
thoughts.push(thought1, thought2, thought3);
const users: Document[] = [];
users.push(user1, user2, user3);

export { users, thoughts };