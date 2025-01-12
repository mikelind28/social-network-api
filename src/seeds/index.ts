import db from '../config/connection.js';
import { User, Thought } from '../models/index.js';
import cleanDB from './cleanDB.js';
import { users, thoughts } from './seeds.js';

try {
    await db();
    await cleanDB();
    await Thought.insertMany(thoughts);
    await User.insertMany(users);
    console.info('Seeding complete.');
    process.exit(0);
} catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
}
