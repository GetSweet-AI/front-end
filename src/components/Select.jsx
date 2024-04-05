import React from 'react';

const Select = ({ options, value, onChange }) => {
    // Default value to the first option if no value is provided
    const defaultValue = value || (options.length > 0 ? options[0]._id : '');

    return (
        <select
            value={defaultValue}
            onChange={onChange}
            className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200"
        >
            {options.map((option, index) => (
                <option className='' key={index} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default Select;
