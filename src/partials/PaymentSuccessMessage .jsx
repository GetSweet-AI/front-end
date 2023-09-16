import React from 'react';

const PaymentSuccessMessage = ({ onClose, text }) => {
    return (
        <div className="fixed md:mx-[30%] inset-x-0 bottom-1 ">
            <div className="bg-green-500 flex justify-between flex-row p-2  text-white rounded-lg  shadow-md">
                <p className="text-lg p-3 mt-1">{text}</p>
                <button
                    className="mt-2 px-4 py-2 bg-green-700 hover:bg-green-800 text-white rounded"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default PaymentSuccessMessage;
