import React from 'react';
export default function Button({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`flex item-center justify-center bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition ${className}`}
    >
      {children}
    </button>
  );
}
