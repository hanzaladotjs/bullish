import * as mongoose from "mongoose";
import * as bcrypt from "bcrypt";

export interface IUser extends mongoose.Document {
    username: string;
    password: string;
    email: string;
}

const userSchema = new mongoose.Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});


export const user = mongoose.model<IUser>("User", userSchema);



