import React from 'react';
export default function Input({ label, error, ...props }) {
  return (
    <div className="mb-3">
      {label && <label className="block text-sm font-medium mb-1">{label}</label>}
      <input
        {...props}
        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
