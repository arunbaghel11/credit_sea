import express from 'express';
import { Transaction } from '../models/Transaction';

const router = express.Router();

router.get('/', async (req, res) => {
  const { userId, ruleId, minScore, maxScore } = req.query;
  const query: any = {};

  if (userId) query.userId = userId;
  if (ruleId) query.matchedRules = ruleId;
  if (minScore || maxScore) {
    query.riskScore = {};
    if (minScore) query.riskScore.$gte = Number(minScore);
    if (maxScore) query.riskScore.$lte = Number(maxScore);
  }

  const txns = await Transaction.find(query).sort({ createdAt: -1 });
  res.json(txns);
});

router.get('/:id', async (req, res) => {
  const txn = await Transaction.findById(req.params.id);
  res.json(txn);
});

export default router;
