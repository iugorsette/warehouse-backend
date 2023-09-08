import * as mongoose from 'mongoose';

export const CollaboratorSchema = new mongoose.Schema({
  id: String,
  name: String,
  role: String,
  created_at: Date,
  updated_at: Date,
});
