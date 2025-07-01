import { createBrowserRouter } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'

import Home from './pages/Home'
import AddExpense from './pages/AddExpense'
import ExpenseList from './pages/ExpenseList'
import SettingsPage from './pages/SettingsPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '', element: <Home /> },
      { path: 'add', element: <AddExpense /> },
      { path: 'list', element: <ExpenseList /> },
      { path: 'settings', element: <SettingsPage />}
    ]
  }
])

export default router
