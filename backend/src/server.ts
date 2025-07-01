import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';

import ruleRoutes from './routes/rules';
import txnRoutes from './routes/transactions';
import { applyRules } from './utils/applyRules';
import { Transaction } from './models/Transaction';
import { Rule } from './models/Rule';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

app.use(cors());
app.use(express.json());

app.use('/api/rules', ruleRoutes);
app.use('/api/transactions', txnRoutes);

// simulate transaction stream
setInterval(async () => {
  const txn = {
    userId: 'user_' + Math.floor(Math.random() * 1000),
    amount: Math.floor(Math.random() * 10000),
    timestamp: new Date(),
  };

  const rules = await Rule.find({ enabled: true });
  const evaluated = applyRules(txn, rules);

  const newTxn = await Transaction.create(evaluated);
  io.emit('transaction', newTxn);
}, 1000); 

const PORT = 4000;

mongoose.connect(process.env.MONGO_URI!).then(() => {
  console.log(' MongoDB connected');
  server.listen(PORT, () => console.log(` Backend running on http://localhost:${PORT}`));
});
