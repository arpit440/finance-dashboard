// Rebuilt: Penta-style Financial Dashboard

import { useEffect, useState } from "react";
import { FaWallet, FaArrowUp, FaArrowDown, FaPiggyBank } from "react-icons/fa";
import type { Transaction } from "../types/Transaction";
import api from "../services/api";
import OverviewChart from "../components/OverviewChart";
import type { FC, ReactNode } from "react";

const Dashboard: FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const res = await api.get("/transactions");
      setTransactions(res.data);
    };
    fetchTransactions();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-60 bg-gray-800 p-6 flex flex-col gap-6">
        <h1 className="text-green-400 text-2xl font-bold">🪙 Penta</h1>
        <nav className="space-y-4 text-sm">
          <a href="#" className="hover:text-green-300">📊 Dashboard</a>
          <a href="#" className="hover:text-green-300">💼 Wallet</a>
          <a href="#" className="hover:text-green-300">📈 Analytics</a>
          <a href="#" className="hover:text-green-300">👤 Profile</a>
          <a href="#" className="hover:text-green-300">📩 Messages</a>
          <a href="#" className="hover:text-green-300">⚙️ Settings</a>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 ml-60 p-6 space-y-6">
        {/* Topbar */}
        <header className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Dashboard</h2>
          <input
            className="bg-gray-700 px-4 py-2 rounded-md w-1/3 text-sm outline-none"
            placeholder="Search..."
          />
        </header>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard label="Balance" value="₹41,210" icon={<FaWallet />} color="text-yellow-400" />
          <StatCard label="Revenue" value="₹25,000" icon={<FaArrowUp />} color="text-green-400" />
          <StatCard label="Expenses" value="₹14,000" icon={<FaArrowDown />} color="text-red-400" />
          <StatCard label="Savings" value="₹2,210" icon={<FaPiggyBank />} color="text-blue-400" />
        </div>

        {/* Chart */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold mb-4">📈 Income vs Expense Overview</h3>
          <OverviewChart />
        </div>

        {/* Table */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg overflow-auto">
          <h3 className="text-lg font-semibold mb-4">📋 Recent Transactions</h3>
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-gray-700">
                <th>Date</th>
                <th>Amount (₹)</th>
                <th>Category</th>
                <th>Status</th>
                <th>User</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx._id} className="border-b border-gray-700 hover:bg-gray-700">
                  <td className="py-2">{new Date(tx.date).toLocaleDateString()}</td>
                  <td className="py-2">₹{tx.amount.toLocaleString("en-IN")}</td>
                  <td className="py-2">{tx.category}</td>
                  <td className="py-2">{tx.status}</td>
                  <td className="py-2">{tx.user_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// StatCard component (inline for convenience)
const StatCard: FC<{ label: string; value: string; icon: ReactNode; color: string }> = ({ label, value, icon, color }) => (
  <div className="bg-gray-800 rounded-lg p-4 shadow-md flex items-center gap-4">
    <div className={`text-2xl ${color}`}>{icon}</div>
    <div>
      <p className="text-sm text-gray-400">{label}</p>
      <h4 className="text-lg font-semibold">{value}</h4>
    </div>
  </div>
);

export default Dashboard;
