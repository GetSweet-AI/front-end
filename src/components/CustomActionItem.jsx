import React from 'react';

function CustomActionItem({ icon, text, onClick }) {
    return (
        <div
            className="flex items-center border-[1px] px-1 border-gray-200 rounded-md text-sm cursor-pointer transition duration-300 ease-in-out hover:bg-gray-800 hover:text-white"
            onClick={onClick}
        >
            {icon && <span className="mr-1">{icon}</span>}
            <p className="md:block hidden">{text}</p>
        </div>
    );
}

export default CustomActionItem;
