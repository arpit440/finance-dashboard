import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  date: Date,
  amount: Number,
  category: String, // "Revenue" or "Expense"
  status: String,   // "Paid" or "Pending"
  user_id: String,
  user_profile: String,
});

export default mongoose.model("Transaction", transactionSchema);
