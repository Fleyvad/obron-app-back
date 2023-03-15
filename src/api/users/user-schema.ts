import mongoose, { Schema } from 'mongoose';

export interface User {
  userName: string;
  email: string;
  password: string;
}

const userSchema = new Schema<User>({
  userName: String,
  email: String,
  password: String,
});

export const UserModel = mongoose.model<User>('User', userSchema, 'users');
