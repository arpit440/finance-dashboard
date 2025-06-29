import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import api from "../services/api";
import type { Transaction } from "../types/Transaction";

const OverviewChart = () => {
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get("/transactions");
      const txs: Transaction[] = res.data;

      // Group by month + type
      const monthly: Record<string, { income: number; expense: number }> = {};

      txs.forEach((tx) => {
        const month = new Date(tx.date).toLocaleString("default", { month: "short" });
        if (!monthly[month]) monthly[month] = { income: 0, expense: 0 };
        if (tx.category === "Revenue") monthly[month].income += tx.amount;
        else monthly[month].expense += tx.amount;
      });

      const formatted = Object.entries(monthly).map(([month, data]) => ({
        month,
        Income: data.income,
        Expenses: data.expense,
      }));

      setChartData(formatted);
    };

    fetchData();
  }, []);

  return (
    <div style={{ width: "100%", height: 300, marginTop: "2rem" }}>
      <h2>📈 Monthly Income vs Expense</h2>
      <ResponsiveContainer>
        <LineChart data={chartData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Income" stroke="#00e676" strokeWidth={2} />
          <Line type="monotone" dataKey="Expenses" stroke="#ff1744" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OverviewChart;
