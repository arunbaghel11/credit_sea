import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  userId: String,
  amount: Number,
  timestamp: Date,
  matchedRules: [String],
  riskScore: Number,
}, { timestamps: true });

export const Transaction = mongoose.model('Transaction', transactionSchema);
