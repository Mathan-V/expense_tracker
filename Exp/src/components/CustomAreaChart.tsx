import React, { useEffect, useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import axios from 'axios';
import dayjs from 'dayjs';

interface Expense {
  date: string;
  amount: number;
  type: 'Expense' | 'Income';
}

interface MonthlyExpense {
  name: string;
  expenses: number;
}

const CustomAreaChart: React.FC = () => {
  const [chartData, setChartData] = useState<MonthlyExpense[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/resource/Expense',{
          params: {
            fields: JSON.stringify(['date', 'amount', 'type']),
            limit_page_length: 1000,
          },
          withCredentials: true,
        });

        const expenses: Expense[] = (response.data.data || []).filter(
          (exp: Expense) => exp.type === 'Expense'
        );

        const monthlyMap: { [month: string]: number } = {};

        expenses.forEach((exp) => {
          const month = dayjs(exp.date).isValid()
            ? dayjs(exp.date).format('MMM')
            : 'Unknown';

          monthlyMap[month] = (monthlyMap[month] || 0) + exp.amount;
        });

        const sortedMonths = [
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
        ];

        const data: MonthlyExpense[] = sortedMonths.map((month) => ({
          name: month,
          expenses: monthlyMap[month] || 0,
        }));

        setChartData(data);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  return (
    <div className="w-full p-4 bg-white rounded-2xl shadow-md">
      <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-700 text-center">
        Monthly Expense Overview
      </h2>
      {loading ? (
        <div className="text-center text-gray-500">Loading chart...</div>
      ) : (
        <div className="w-full h-[250px] sm:h-[300px] md:h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => `₹${value}`} />
              <Area
                type="monotone"
                dataKey="expenses"
                stroke="#3b82f6"
                fill="#93c5fd"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default CustomAreaChart;
