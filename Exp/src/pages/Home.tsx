import { useEffect, useState } from 'react';
import axios from 'axios';
import CustomAreaChart from '../components/CustomAreaChart';
import CustomPieChart from '../components/CustomPieChart';

const Home = () => {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/resource/Expense', {
          params: {
            fields: JSON.stringify(['type', 'amount']),
            limit_page_length: 1000,
          },
          withCredentials: true,
        });

        const entries = res.data.data || [];
        console.log('Entries:', entries);

        let income = 0, expense = 0;
        for (const entry of entries) {
          const amt = Number(entry.amount) || 0;
          if (entry.type === 'Income') income += amt;
          else if (entry.type === 'Expense') expense += amt;
        }

        setIncome(income);
        setExpense(expense);
      } catch (err) {
        console.error('API Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  const balance = income - expense;

  return (
    <div className="min-h-screen p-4 sm:p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <StatCard title="Income" value={income} loading={loading} color="bg-green-500" />
        <StatCard title="Expense" value={expense} loading={loading} color="bg-red-500" />
        <StatCard title="Balance" value={balance} loading={loading} color="bg-blue-500" />
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="bg-white p-6 rounded-lg shadow w-full md:w-1/2">
          <CustomAreaChart />
        </div>
        <div className="bg-white p-6 rounded-lg shadow w-full md:w-1/2">
          <CustomPieChart />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({
  title,
  value,
  loading,
  color,
}: {
  title: string;
  value: number;
  loading: boolean;
  color: string;
}) => (
  <div className={`${color} text-white p-6 rounded-lg shadow`}>
    <h3 className="text-lg">{title}</h3>
    <p className="text-2xl">
      {loading ? 'Loading...' : `₹${value.toLocaleString('en-IN')}`}
    </p>
  </div>
);

export default Home;
