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
        maxlength: 350,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
        type: String,
        ref: 'User',
        required: true,
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
            if (this.reactions.length === 1) {
                return `This Thought has 1 Reaction.`
            } else {
                return `This Thought has ${this.reactions.length} Reactions.`
            }
        } else {
            return "This Thought has no Reactions. ☹️"
        }
    })

thoughtSchema
    .virtual('dateFormat')
    .get(function(this: IThought) {
      let formattedDate = this.createdAt.toLocaleString("en-US");
      return formattedDate;
    });

const Thought = model('Thought', thoughtSchema);

export default Thought;
