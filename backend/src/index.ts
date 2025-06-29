import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import transactionRoutes from './routes/transactionRoutes';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/transactions', transactionRoutes);

mongoose.connect(process.env.MONGO_URI!)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas');
    app.listen(5000, () => console.log('🚀 Server running on http://localhost:5000'));
  })
  .catch(err => console.error('❌ MongoDB connection failed:', err));
