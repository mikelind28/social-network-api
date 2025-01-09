import { Schema, Types, model, Document, ObjectId } from 'mongoose';

interface IReaction extends Document {
    reactionId: Schema.Types.ObjectId,
    reactionBody: string,
    username: string,
    createdAt: Date,
}

interface IThought extends Document {
  thoughtText: string,
  createdAt: Date,
  username: string,
  reactions?: ObjectId[],
}

const reactionSchema = new Schema<IReaction>(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    }
)

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
        ref: 'user'
    },
    reactions: [reactionSchema]
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
