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
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        required: true,
        unique: true,
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'user'
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
            return `This user has ${this.friends.length} friends.`
        } else {
            return "This user has no friends. ☹️"
        }
    });

const User = model('User', userSchema);

export default User;
