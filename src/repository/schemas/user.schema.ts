import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  id: String,
  name: String,
  email: String,
  password: String,
  created_at: Date,
  updated_at: Date,
});
