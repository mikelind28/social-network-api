import { Schema, model, Document } from 'mongoose';
import Reaction from './Reaction.js';

interface IThought extends Document {
  thoughtText: string,
  createdAt: Date,
  username: string,
  reactions?: typeof Reaction[],
}

const thoughtSchema = new Schema<IThought>(
  {
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
        type: String,
        ref: 'User'
    },
    reactions: [Reaction]
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema
    .virtual('reactionCount')
    .get(function (this: IThought) {
        if (this.reactions) {
            return `This Thought has ${this.reactions.length} Reactions.`
        } else {
            return `This Thought doesn't have any Reactions.`
        }
    });

const Thought = model('thought', thoughtSchema);

export default Thought;
