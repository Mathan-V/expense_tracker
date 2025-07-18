import React, { useEffect, useState } from 'react';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import axios from 'axios';

interface Expense {
  category: string;
  amount: number;
  type: 'Expense' | 'Income';
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

const CustomPieChart: React.FC = () => {
  const [data, setData] = useState<{ name: string; value: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get(window.origin + '/api/resource/Expense', {
          params: {
            fields: JSON.stringify(['category', 'amount', 'type']), // ✅ include type
            limit_page_length: 1000,
          },
          withCredentials: true,
        });

        const expenses: Expense[] = (response.data.data || []).filter(
          (exp: Expense) => exp.type === 'Expense' // ✅ filter only "Expense"
        );

        const categoryMap: { [key: string]: number } = {};

        expenses.forEach((exp) => {
          const category = exp.category || 'Uncategorized';
          categoryMap[category] = (categoryMap[category] || 0) + exp.amount;
        });

        const pieData = Object.entries(categoryMap).map(([name, value]) => ({
          name,
          value,
        }));

        setData(pieData);
      } catch (error) {
        console.error('Error fetching pie chart data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  return (
    <div className="w-full p-4 bg-white rounded-2xl shadow-md">
      <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-700 text-center">
        Expense by Category
      </h2>
      {loading ? (
        <div className="text-center text-gray-500">Loading chart...</div>
      ) : (
        <div className="w-full h-[250px] sm:h-[300px] md:h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} (${(percent * 100).toFixed(0)}%)`
                }
                outerRadius="80%"
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `₹${value}`} />
              <Legend verticalAlign="bottom" height={50} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default CustomPieChart;
