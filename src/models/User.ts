import { Schema, model, Document, ObjectId } from 'mongoose';

interface IUser extends Document {
    username: string,
    email: string,
    thoughts?: ObjectId[],
    friends?: ObjectId[]
}

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought',
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }
    ]
},
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

userSchema
    .virtual('friendCount')
    .get(function (this: IUser) {
        if (this.friends) {
            if (this.friends.length === 1) {
                return `This user has 1 friend.`
            } else {
                return `This user has ${this.friends.length} friends.`
            }
        } else {
            return "This user has no friends. ☹️"
        }
    });

const User = model('User', userSchema);

export default User;
