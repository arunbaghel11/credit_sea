import mongoose from 'mongoose';

const ruleSchema = new mongoose.Schema({
  name: String,
  expression: String, // e.g., amount > 5000
  riskScore: Number,
  enabled: Boolean,
}, { timestamps: true });

export const Rule = mongoose.model('Rule', ruleSchema);
