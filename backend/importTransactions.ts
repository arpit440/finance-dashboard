import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import Transaction from './src/models/Transaction';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI!;
const dataPath = path.join(__dirname, 'transactions.json');

const loadData = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    const jsonData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    await Transaction.insertMany(jsonData);
    console.log("✅ Transactions imported successfully!");
    mongoose.disconnect();
  } catch (err) {
    console.error("❌ Error importing transactions:", err);
  }
};

loadData();
