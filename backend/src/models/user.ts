// mongodb schema for user
import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    id: string;
    username: string;
    password: string;
}

const userSchema: Schema = new Schema({
    _id: { type: mongoose.Types.ObjectId, auto:true },
    username: { type: String, required: true },
    password: { type: String, required: true }
});

export default mongoose.model<IUser>("User", userSchema);