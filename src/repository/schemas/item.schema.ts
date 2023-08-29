import * as mongoose from 'mongoose';

export const ItemSchema = new mongoose.Schema({
  id: String,
  title: String,
  description: String,
  created_at: Date,
  updated_at: Date,
});
