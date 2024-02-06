import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

function RadioButton({ id, value, checked, onChange, label, img, imgTwo }) {
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
                 w-200 p-2 rounded-lg border flex-col
                  border-gray-400 ${checked ? 'bg-blue-600' : '' // Change background color when selected
                    }`}
            >

                {/* <FontAwesomeIcon icon={icon} color="#0967eb" size="xl" /> */}
                <div className='flex space-x-2'> <img alt="image" src={img} className='w-12 h-12 mb-2 object-contain' />
                    {imgTwo && <img alt="image" src={imgTwo} className='w-12 h-12 mb-2 object-contain' />}
                </div>



                <span className={`text-sm font-medium
                 ${checked ? 'text-white' : 'text-blue-700'
                    }`}
                >
                    {label}
                </span>
            </label>
        </div>
    );
}

export default RadioButton;
