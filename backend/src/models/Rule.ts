import mongoose from 'mongoose';

const ruleSchema = new mongoose.Schema({
  name: String,
  expression: String, 
  riskScore: Number,
  enabled: Boolean,
}, { timestamps: true });

export const Rule = mongoose.model('Rule', ruleSchema);
