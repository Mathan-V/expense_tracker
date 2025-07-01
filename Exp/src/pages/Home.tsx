import React, { useEffect, useState } from 'react';
import CustomAreaChart from '../components/CustomAreaChart';
import CustomPieChart from '../components/CustomPieChart';
import axios from 'axios';

const Home = () => {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.get('/api/resource/Expense', {
          params: {
            fields: JSON.stringify(['type', 'amount']),
            limit_page_length: 1000,
          },
          withCredentials: true,
        });

        const entries = response.data.data || [];

        let totalIncome = 0;
        let totalExpense = 0;

        entries.forEach(entry => {
          if (entry.type === 'Income') {
            totalIncome += entry.amount;
          } else if (entry.type === 'Expense') {
            totalExpense += entry.amount;
          }
        });

        setIncome(totalIncome);
        setExpense(totalExpense);
      } catch (error) {
        console.error('Failed to load summary data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  const balance = income - expense;

  return (
    <div className="min-h-screen p-4 sm:p-6 space-y-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-green-400 w-full p-4 sm:p-6 text-white font-semibold rounded-lg shadow">
          <h3 className="text-base sm:text-lg">Income Amount</h3>
          <h4 className="text-xl sm:text-2xl">{loading ? 'Loading...' : `₹${income.toLocaleString()}`}</h4>
        </div>
        <div className="bg-red-300 w-full p-4 sm:p-6 text-white font-semibold rounded-lg shadow">
          <h3 className="text-base sm:text-lg">Expense Amount</h3>
          <h4 className="text-xl sm:text-2xl">{loading ? 'Loading...' : `₹${expense.toLocaleString()}`}</h4>
        </div>
        <div className="bg-green-300 w-full p-4 sm:p-6 text-white font-semibold rounded-lg shadow">
          <h3 className="text-base sm:text-lg">Balance Amount</h3>
          <h4 className="text-xl sm:text-2xl">{loading ? 'Loading...' : `₹${balance.toLocaleString()}`}</h4>
        </div>
      </div>

      {/* Charts Section */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="bg-gray-100 p-4 sm:p-6 w-full md:w-1/2 rounded-lg shadow">
          <CustomAreaChart />
        </div>
        <div className="bg-gray-100 p-4 sm:p-6 w-full md:w-1/2 rounded-lg shadow">
          <CustomPieChart />
        </div>
      </div>
    </div>
  );
};

export default Home;
