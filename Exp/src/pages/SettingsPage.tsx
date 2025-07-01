// pages/SettingsPage.tsx
import React from 'react';

const SettingsPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">⚙️ Settings</h1>

      {/* Profile Section */}
      <div className="bg-gray-100 p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-2">User Preferences</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Display Name</label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Currency</label>
            <select className="mt-1 block w-full border border-gray-300 rounded-md p-2">
              <option value="INR">INR - ₹</option>
              <option value="USD">USD - $</option>
              <option value="EUR">EUR - €</option>
            </select>
          </div>
          <button type="submit" className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;
