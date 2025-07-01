import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const MainLayout = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 mt-16 md:mt-0">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
