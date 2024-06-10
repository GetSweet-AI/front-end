import React, { useState, useEffect, useRef } from "react";

function EditCaptionModal({ isOpen, onClose, promptInput, setPromptInput, handleInputChange, handleModalButtonClick, isLoading }) {
    const modalRef = useRef();

    useEffect(() => {
        function handleClickOutside(event) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        }

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onClose]);

    return (
        <>
            {isOpen && (
                <div className="absolute px-4 top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-black opacity-10"></div>
                    <div ref={modalRef} className="bg-white p-4 rounded-md shadow-lg z-10 w-full max-w-md">
                        <div className="flex justify-end items-center mb-2">
                            <button
                                onClick={onClose}
                                className="text-pink-600 hover:bg-pink-100 bg-white rounded-full  p-2 focus:outline-none border border-gray-200"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>

                        <input
                            type="text"
                            value={promptInput}
                            onChange={handleInputChange}
                            className="border form-input border-gray-300 rounded-md px-4 py-3 mb-6 w-full focus:outline-none focus:border-blue-500"
                            placeholder="Make caption more attractive.."
                        />
                        <div className="flex justify-end">
                            <button
                                disabled={isLoading}
                                onClick={() => handleModalButtonClick(promptInput)}
                                className={`px-4 py-2 rounded-md focus:outline-none ${isLoading
                                    ? 'bg-gray-800 cursor-not-allowed text-white'
                                    : 'bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white'
                                    }`}
                            >
                                {isLoading ? 'Generating...' : 'Generate Variant'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default EditCaptionModal;
