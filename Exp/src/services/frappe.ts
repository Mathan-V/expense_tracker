import axios from 'axios';

const API = 'http://localhost:8000/api/resource';
axios.defaults.headers.common['Authorization'] = 'token c8040957f123404:35594e3ad4b4a48';

export interface Expense {
  title: string;
  amount: number;
  category: string;
  date: string;
  payment_method?: string;
  notes?: string;
}

export const getExpenses = async () => {
  const res = await axios.get(
    `${API}/Expense?fields=["name","title","amount","category","payment_method","date","notes","type"]&order_by=date desc`
  );
  return res.data.data;
};


// ✅ Helper: Check existence
const getAll = async (doctype: string) => {
  const res = await axios.get(`${API}/${doctype}`);
  return res.data.data.map((item: any) => item.name);
};



const ensureExists = async (doctype: string, value: string) => {
  const all = await getAll(doctype);
  if (!all.includes(value)) {
    await axios.post(`${API}/${doctype}`, {
      doctype,
      name: value,
    });
  }
};

export const addExpense = async (expense: Expense) => {
  // Auto-create category and payment method if missing
  if (expense.category) await ensureExists('Category', expense.category);
  if (expense.payment_method) await ensureExists('Payment Method', expense.payment_method);

  const res = await axios.post(`${API}/Expense`, {
    doctype: 'Expense',
    ...expense,
  });
  return res.data.data;
};

export const getCategories = async () => {
  const res = await axios.get(`${API}/Category`);
  return res.data.data;
};

export const getPaymentMethods = async () => {
  const res = await axios.get(`${API}/Payment Method`);
  return res.data.data;
};


export const createCategory = async (name: string) => {
  return await axios.post(`${API}/Category`, { name });
};

export const createPaymentMethod = async (name: string) => {
  return await axios.post(`${API}/Payment Method`, { name });
};
