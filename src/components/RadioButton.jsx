import React from 'react';

function RadioButton({ id, value, checked, onChange, label }) {
    return (
        <div className="flex items-center mb-4 mx-2">
            <input
                type="radio"
                id={id}
                value={value}
                checked={checked}
                onChange={onChange}
                className="hidden" // Hide the default radio input
            />
            <label
                htmlFor={id}
                className={`relative cursor-pointer flex
                 items-center transition-all duration-300
                 w-200 p-2 rounded-lg border
                  border-gray-400 ${checked ? 'bg-blue-500' : '' // Change background color when selected
                    }`}
            >
                <div
                    className={`w-4 h-4 border-2 rounded-full mr-2 ${checked
                        ? 'bg-white' // Selected state
                        : 'border-gray-400' // Unselected state
                        }`}
                >
                    <div
                        className={`w-2 h-2 rounded-full transition-transform duration-300 transform
                         ${checked ? 'scale-100' : 'scale-0' // Circle inside for the checkmark
                            }`}
                    ></div>
                </div>
                <span
                    className={`text-sm font-medium ${checked ? 'text-white' : 'text-gray-700'
                        }`}
                >
                    {label}
                </span>
            </label>
        </div>
    );
}

export default RadioButton;
