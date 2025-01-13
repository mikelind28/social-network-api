import { Schema, Types, Document, ObjectId } from 'mongoose';

interface IReaction extends Document {
    reactionId: ObjectId,
    reactionBody: string,
    username: string,
    createdAt: Date,
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
            maxlength: 350,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

reactionSchema
    .virtual('dateFormat')
    .get(function(this: IReaction) {
      let formattedDate = this.createdAt.toLocaleString("en-US");
      return formattedDate;
    });

export default reactionSchema;