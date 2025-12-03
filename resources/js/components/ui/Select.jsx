import React from 'react';
import ReactSelect from "react-select";

export default function Select({ label, options, isMulti, value, onChange }) {
  return (
    <div className="mb-3">
      {label && <label className="block text-sm font-medium mb-1">{label}</label>}
      <ReactSelect
        isMulti={isMulti}
        options={options}
        value={value}
        onChange={onChange}
        classNamePrefix="react-select"
      />
    </div>
  );
}
