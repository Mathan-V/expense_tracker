import axios from 'axios';

const API = window.origin + '/api/resource';

axios.defaults.withCredentials = true;

if (typeof window !== 'undefined' && (window as any).csrf_token) {
  axios.defaults.headers.common['X-Frappe-CSRF-Token'] = (window as any).csrf_token;
}

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


const ensureExists = async (doctype: string, name: string) => {
  try {
    await axios.get(`${API}/${doctype}/${name}`);
  } catch (err: any) {
    if (err.response?.status === 404) {
      await axios.post(`${API}/${doctype}`, {
        doctype,
        name,
      });
    } else {
      throw err;
    }
  }
};


export const addExpense = async (expense: Expense) => {
  try {
    if (expense.category) await ensureExists("Category", expense.category);
    if (expense.payment_method)
      await ensureExists("Payment Method", expense.payment_method);

    const res = await axios.post(`${API}/Expense`, {
      ...expense,
      doctype: "Expense",
    });

    return res.data.data;
  } catch (err: any) {
    console.error("Failed to add expense:", err.response?.data || err.message);
    throw err;
  }
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
  return await axios.post(`${API}/Category`, {
    doctype: "Category",
    name,
  });
};

export const createPaymentMethod = async (name: string) => {
  return await axios.post(`${API}/Payment Method`, {
    doctype: "Payment Method",
    name,
  });
};
