import {
  Users,
  HelpCircle,
  ArrowLeftRight,
  Plus,
  Home,
  List,
  Menu,
  X,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState('');
  const location = useLocation();

  const toggleCollapse = () => setCollapsed(!collapsed);
  const toggleMobile = () => setMobileOpen(!mobileOpen);
  const toggleUserDropdown = () => setUserDropdownOpen(!userDropdownOpen);

  const handleMobileNav = () => {
    if (window.innerWidth < 768) setMobileOpen(false);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          'http://localhost:8000/api/method/frappe.auth.get_logged_user',
          { withCredentials: true }
        );
        setCurrentUser(res.data.message);
      } catch (err) {
        console.error('Failed to fetch user', err);
        setCurrentUser('Guest');
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      {/* Mobile menu toggle */}
      <button
        onClick={toggleMobile}
        className="md:hidden fixed top-4 left-4 z-50 bg-white border p-2 rounded-md shadow"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-40"
          onClick={toggleMobile}
        />
      )}

      {/* Sidebar container */}
      <div
        className={`fixed md:static top-0 left-0 z-50 h-full bg-white shadow-sm transition-all duration-300 flex flex-col justify-between
        ${mobileOpen ? 'w-64' : collapsed ? 'w-20' : 'w-64'} 
        ${mobileOpen ? 'block' : 'hidden md:flex'}
        `}
      >
        {/* Top */}
        <div>
          <div className="p-4 border-b relative">
            {!collapsed && (
              <>
                <h1 className="text-xl font-bold text-blue-600">Expense Tracker</h1>
                <p className="text-sm text-gray-500">Track Exp</p>
              </>
            )}

            {/* User Dropdown */}
            <div className="mt-3 relative">
              <button
                onClick={toggleUserDropdown}
                className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-black"
              >
                <Users size={18} />
                {!collapsed && <span>{currentUser || 'Loading...'}</span>}
              </button>

              {userDropdownOpen && !collapsed && (
                <div className="absolute left-0 mt-2 w-40 bg-white border rounded shadow z-50">
                  <button
                    className="w-full px-4 py-2 text-left hover:bg-gray-100 text-sm"
                    onClick={() => (window.location.href = 'http://localhost:8000/app')}
                  >
                    Switch to Desk
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Menu Links */}
          <nav className="mt-4 px-2 space-y-1">
            <SidebarLink
              icon={<Home size={18} />}
              label="Dashboard"
              to="/"
              active={location.pathname === '/'}
              collapsed={collapsed}
              onClick={handleMobileNav}
            />
            <SidebarLink
              icon={<Plus size={18} />}
              label="Add Expense"
              to="/add"
              active={location.pathname === '/add'}
              collapsed={collapsed}
              onClick={handleMobileNav}
            />
            <SidebarLink
              icon={<List size={18} />}
              label="View Expenses"
              to="/list"
              active={location.pathname === '/list'}
              collapsed={collapsed}
              onClick={handleMobileNav}
            />
          </nav>
        </div>

        {/* Bottom */}
        <div className="p-4 border-t space-y-1 text-sm">
          <SidebarLink
            icon={<HelpCircle size={18} />}
            label="Help"
            to="/help"
            active={location.pathname === '/help'}
            collapsed={collapsed}
            onClick={handleMobileNav}
          />
          <button
            onClick={toggleCollapse}
            className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg w-full"
          >
            <ArrowLeftRight size={18} />
            {!collapsed && <span>Collapse</span>}
          </button>
        </div>
      </div>
    </>
  );
};

type SidebarLinkProps = {
  icon: React.ReactNode;
  label: string;
  to: string;
  active?: boolean;
  collapsed?: boolean;
  onClick?: () => void;
};

const SidebarLink = ({
  icon,
  label,
  to,
  active = false,
  collapsed = false,
  onClick,
}: SidebarLinkProps) => (
  <Link
    to={to}
    onClick={onClick}
    className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition ${
      active ? 'bg-gray-100 font-medium text-black' : 'text-gray-600'
    }`}
  >
    {icon}
    {!collapsed && <span>{label}</span>}
  </Link>
);

export default Sidebar;
