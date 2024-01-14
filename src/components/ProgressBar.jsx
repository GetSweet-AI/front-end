import React from 'react';

const ProgressBar = ({ progress, title }) => {
    return (
        <div className="w-full bg-gray-200 rounded-full">
            <div className="bg-blue-600 text-xs font-medium text-white text-center p-0.5 leading-none rounded-l-full"
                style={{ width: `${progress}%`, transition: 'width 0.5s ease-in-out' }}>
                {title}
            </div>
        </div>
    );
};

export default ProgressBar;
