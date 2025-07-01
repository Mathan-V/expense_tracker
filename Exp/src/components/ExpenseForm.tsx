import { useEffect, useState } from 'react';
import {
  addExpense,
  getCategories,
  getPaymentMethods,
  createCategory,
  createPaymentMethod,
} from '../services/frappe';
import type { Expense } from '../services/frappe';

export const ExpenseForm = () => {
  const [form, setForm] = useState<Expense>({
    title: '',
    amount: 0,
    category: '',
    payment_method: '',
    date: new Date().toISOString().split('T')[0],
    notes: '',
    type: 'Expense',
  });

  const [categories, setCategories] = useState<string[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const cats = await getCategories();
        const methods = await getPaymentMethods();
        setCategories(cats.map((c: any) => c.name));
        setPaymentMethods(methods.map((m: any) => m.name));
      } catch (err: any) {
        console.error('Fetch error:', err?.response?.data || err);
      }
    })();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value || '0') : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addExpense(form);
      alert('Expense saved!');
      setForm({
        title: '',
        amount: 0,
        category: '',
        payment_method: '',
        date: new Date().toISOString().split('T')[0],
        notes: '',
        type: 'Expense',
      });
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Failed to save expense');
    }
  };

  const handleCreateCategory = async () => {
    if (!form.category) return;
    try {
      await createCategory(form.category);
      const cats = await getCategories();
      setCategories(cats.map((c: any) => c.name));
      alert('Category created');
    } catch {
      alert('Failed to create category. It may already exist or you lack permission.');
    }
  };

  const handleCreatePaymentMethod = async () => {
    if (!form.payment_method) return;
    try {
      await createPaymentMethod(form.payment_method);
      const methods = await getPaymentMethods();
      setPaymentMethods(methods.map((m: any) => m.name));
      alert('Payment Method created');
    } catch {
      alert('Failed to create payment method. It may already exist or you lack permission.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white p-6 rounded-xl shadow space-y-6 sm:p-8"
      >
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 text-center">Add New Expense</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              name="title"
              placeholder="e.g. Groceries"
              onChange={handleChange}
              value={form.title}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
            <input
              name="amount"
              type="number"
              placeholder="e.g. 1500"
              step="0.01"
              onChange={handleChange}
              value={form.amount === 0 ? '' : form.amount}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-teal-500"
              required
            >
              <option value="Expense">Expense</option>
              <option value="Income">Income</option>
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              name="date"
              type="date"
              onChange={handleChange}
              value={form.date}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          {/* Category Input with Button */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <div className="flex gap-2">
              <input
                name="category"
                list="category-options"
                value={form.category}
                onChange={handleChange}
                placeholder="Select or type new category"
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-teal-500"
                required
              />
              <button
                type="button"
                onClick={handleCreateCategory}
                className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
              >
                +
              </button>
            </div>
            <datalist id="category-options">
              {categories.map(c => (
                <option key={c} value={c} />
              ))}
            </datalist>
          </div>

          {/* Payment Method Input with Button */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
            <div className="flex gap-2">
              <input
                name="payment_method"
                list="payment-options"
                value={form.payment_method}
                onChange={handleChange}
                placeholder="Select or type new payment method"
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-teal-500"
                required
              />
              <button
                type="button"
                onClick={handleCreatePaymentMethod}
                className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
              >
                +
              </button>
            </div>
            <datalist id="payment-options">
              {paymentMethods.map(m => (
                <option key={m} value={m} />
              ))}
            </datalist>
          </div>

          {/* Notes */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes (optional)</label>
            <input
              name="notes"
              placeholder="Additional info"
              onChange={handleChange}
              value={form.notes}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition duration-200 font-semibold"
        >
          Save Expense
        </button>
      </form>
    </div>
  );
};
