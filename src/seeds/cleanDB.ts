import { User, Thought } from '../models/index.js';

const cleanDB = async (): Promise<void> => {
  try {
    await User.deleteMany({});
    console.log('Deleted all users.');

    await Thought.deleteMany({});
    console.log('Deleted all thoughts.');

  } catch (error) {
    console.error('Error cleaning collections:', error);
    process.exit(1);
  }
};

export default cleanDB;
