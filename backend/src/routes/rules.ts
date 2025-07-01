import express from 'express';
import { Rule } from '../models/Rule';

const router = express.Router();

router.get('/', async (req, res) => {
  const rules = await Rule.find();
  res.json(rules);
});

router.post('/', async (req, res) => {
  const rule = await Rule.create(req.body);
  res.json(rule);
});

router.put('/:id', async (req, res) => {
  const rule = await Rule.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(rule);
});

router.delete('/:id', async (req, res) => {
  await Rule.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

export default router;
