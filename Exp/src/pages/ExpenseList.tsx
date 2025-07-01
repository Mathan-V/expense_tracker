import { useEffect, useState } from 'react';
import { getExpenses } from '../services/frappe';
import type { Expense } from '../services/frappe';

const ExpenseList = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    getExpenses()
      .then((data) => {
        const formatted = data.map((item: any) => item.doc || item);
        setExpenses(formatted);
      })
      .catch(() => {
        alert('Failed to load expenses');
      });
  }, []);

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800">All Expenses</h1>

      {/* Table for larger screens */}
      <div className="hidden md:block overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white divide-y divide-gray-200">
          <thead className="bg-teal-600 text-white">
            <tr>
              <th className="text-left px-4 py-3">Title</th>
              <th className="text-left px-4 py-3">Amount</th>
              <th className="text-left px-4 py-3">Category</th>
              <th className="text-left px-4 py-3">Payment Method</th>
              <th className="text-left px-4 py-3">Date</th>
              <th className="text-left px-4 py-3">Type</th>
              <th className="text-left px-4 py-3">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-700">
            {expenses.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-400">
                  No expenses found.
                </td>
              </tr>
            ) : (
              expenses.map((e, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{e.title || '-'}</td>
                  <td className="px-4 py-3">₹{e.amount?.toFixed(2)}</td>
                  <td className="px-4 py-3">{e.category || '-'}</td>
                  <td className="px-4 py-3">{e.payment_method || '-'}</td>
                  <td className="px-4 py-3">{e.date || '-'}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-1 rounded-full text-sm font-medium ${
                      e.type === 'Income' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {e.type || '-'}
                    </span>
                  </td>
                  <td className="px-4 py-3">{e.notes || '-'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {expenses.length === 0 ? (
          <div className="text-center text-gray-400">No expenses found.</div>
        ) : (
          expenses.map((e, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow p-4 space-y-2 text-sm text-gray-700"
            >
              <div className="flex justify-between">
                <span className="font-semibold">{e.title || '-'}</span>
                <span className="font-bold text-right">₹{e.amount?.toFixed(2)}</span>
              </div>
              <div>
                <strong>Category:</strong> {e.category || '-'}
              </div>
              <div>
                <strong>Payment:</strong> {e.payment_method || '-'}
              </div>
              <div>
                <strong>Date:</strong> {e.date || '-'}
              </div>
              <div>
                <strong>Type:</strong>{' '}
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    e.type === 'Income' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}
                >
                  {e.type || '-'}
                </span>
              </div>
              {e.notes && (
                <div>
                  <strong>Notes:</strong> {e.notes}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ExpenseList;
