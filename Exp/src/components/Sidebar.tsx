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
import { useState } from 'react';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const toggleCollapse = () => setCollapsed(!collapsed);
  const toggleMobile = () => setMobileOpen(!mobileOpen);

  // Close sidebar on link click (only for mobile)
  const handleMobileNav = () => {
    if (window.innerWidth < 768) {
      setMobileOpen(false);
    }
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={toggleMobile}
        className="md:hidden fixed top-4 left-4 z-50 bg-white border p-2 rounded-md shadow"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-40"
          onClick={toggleMobile}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 z-50 h-full bg-white shadow-sm transition-all duration-300 flex flex-col justify-between
        ${mobileOpen ? 'w-64' : collapsed ? 'w-20' : 'w-64'} 
        ${mobileOpen ? 'block' : 'hidden md:flex'}
        `}
      >
        {/* Top Section */}
        <div>
          <div className="p-4 border-b">
            {!collapsed && (
              <>
                <h1 className="text-xl font-bold text-blue-600">Expense Tracker</h1>
                <p className="text-sm text-gray-500">Track Exp</p>
              </>
            )}
            <SidebarLink
              icon={<Users size={18} />}
              label="Administrator"
              to="/user"
              active={location.pathname === '/user'}
              collapsed={collapsed}
              onClick={handleMobileNav}
            />
          </div>

          {/* Menu Items */}
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

        {/* Bottom Section */}
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
