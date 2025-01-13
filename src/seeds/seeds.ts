import { Document } from 'mongoose';
import { User } from '../models/index.js';
import { Thought } from '../models/index.js';

const thought1 = new Thought({
    thoughtText: "Wealth is derived from the labor of the people who create goods and perform services. Shouldn't those who create the wealth own the means of production?",
    username: "socialismFan1848",
    reactions: [
        {
            reactionBody: "Yes, but couldn't we go further? How can one claim personal ownership over a product, an idea, or a parcel of land? Any one of these things owes its existence to countless hours of labor performed over generations, and indeed, to the soil, the water, and the sunlight, the very combination of which has cast us into being.",
            username: "communismLover1917"
        },
        {
            reactionBody: "No. I think one person should be able to claim ownership over unlimited resources, and they should be able to extract and maintain as much wealth from those resources as they wish.",
            username: "capitalismEnthusiast1981"
        }
    ]
});

const thought2 = new Thought({
    thoughtText: "I long for a society devoid of inequality.",
    username: "communismLover1917",
    reactions: [
        {
            reactionBody: "🙄🙄🙄",
            username: "capitalismEnthusiast1981"
        },
        {
            reactionBody: "I'm sorry, this just sounds unrealistic.",
            username: "capitalismEnthusiast1981"
        },
    ]
});

const thought3 = new Thought({
    thoughtText: "I was on my way back from denying essential goods and services to those who would not or could not participate in wage labor for me, when someone threw a coffee at me on the street. What gives?",
    username: "capitalismEnthusiast1981",
    reactions: []
});

const user1 = new User({
    username: "socialismFan1848",
    email: "seize-the-means@revolution.org",
    thoughts: [thought1._id],
    friends: []
});

const user2 = new User({
    username: "communismLover1917",
    email: "toEachFromEach@equality.coop",
    thoughts: [thought2._id],
    friends: []
});

const user3 = new User({
    username: "capitalismEnthusiast1981",
    email: "corporationsArePeople@infiniteGrowth.biz",
    thoughts: [thought3._id],
    friends: []
});

const thoughts: Document[] = []
thoughts.push(thought1, thought2, thought3);
const users: Document[] = [];
users.push(user1, user2, user3);

export { users, thoughts };