import React, { useState, useEffect } from 'react';
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function Onboarding({ isOpen, closeModal, disableFirstLogin }) {
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if (isOpen) {
            setCurrentPage(1); // Reset to the first page when the modal is opened
        }
    }, [isOpen]);

    const handleNext = () => {
        if (currentPage < 3) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleFinish = () => {
        closeModal();
        disableFirstLogin();
    };

    const handleCancel = () => {
        closeModal();
        disableFirstLogin();
    };

    const handleBack = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleSkip = () => {
        if (currentPage === 3) {
            closeModal();
            disableFirstLogin();
        } else {
            setCurrentPage(3);
        }
    };

    const renderContent = () => {
        switch (currentPage) {
            case 1:
                return <>Form 1</>;
            case 2:
                return <>Form 2 </>;
            case 3:
                return <>Form 3 </>;
            default:
                return null;
        }
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-20"
                onClose={handleCancel} // Close modal on cancel
            >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <div className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                            <Dialog.Title
                                as="h3"
                                className="text-lg font-medium leading-6 text-gray-900"
                            >
                                Onboarding
                            </Dialog.Title>
                            <div className="mt-3">
                                {renderContent()}
                            </div>

                            <div className="mt-6 flex justify-end space-x-2">
                                {currentPage > 1 && (
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        onClick={handleBack}
                                    >
                                        Back
                                    </button>
                                )}
                                {currentPage < 3 && (
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        onClick={handleNext}
                                    >
                                        Next
                                    </button>
                                )}
                                {currentPage === 3 ? (
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        onClick={handleFinish}
                                    >
                                        Finish
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        onClick={handleSkip}
                                    >
                                        Skip
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
