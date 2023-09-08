import * as mongoose from 'mongoose';

export const EquipmentSchema = new mongoose.Schema({
  id: String,
  title: String,
  description: String,
  created_at: Date,
  updated_at: Date,
});
