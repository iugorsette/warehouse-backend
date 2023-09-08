import * as mongoose from 'mongoose';

export const DepartmentSchema = new mongoose.Schema({
  id: String,
  name: String,
  created_at: Date,
  updated_at: Date,
});

