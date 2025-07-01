import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import {Rule} from "../models/Rule";

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/fraudDB";

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("[DB] Connected");

    const rules = [
      {
        name: "High Value Txn",
        expression: "txn.amount > 5000",
        riskScore: 80,
        enabled: true,
      },
      {
        name: "Low Value Txn",
        expression: "txn.amount < 100",
        riskScore: 30,
        enabled: true,
      },
      {
        name: "Specific User Txn",
        expression: 'txn.userId === "user_123"',
        riskScore: 50,
        enabled: true,
      },
    ];

    await Rule.deleteMany({});
    await Rule.insertMany(rules);
    console.log("[SEED] Rules inserted successfully");

    process.exit(0);
  } catch (err) {
    console.error("[ERROR] Failed to seed:", err);
    process.exit(1);
  }
}

seed();
