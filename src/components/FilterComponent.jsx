import React, { useState, useEffect } from 'react';
import { Disclosure } from '@headlessui/react';
import { faUpDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FilterComponent = ({ label, isScheduled, isNonScheduled, isArchived, setIsScheduled, setIsNonScheduled, setIsArchived, applyFilter }) => {

    const handleScheduledChange = (event) => {
        setIsScheduled(event.target.checked);
    };

    const handleNonScheduledChange = (event) => {
        setIsNonScheduled(event.target.checked);
    };

    const handleArchivedChange = (event) => {
        setIsArchived(event.target.checked);
    };

    return (
        <div className="">
            <div className="mx-2">
                <Disclosure defaultOpen>
                    {({ open }) => (
                        <>
                            <Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-2 text-left text-sm font-medium text-gray-600 hover:bg-blue-100 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                                <span className="mr-2">{label}</span>
                                <FontAwesomeIcon
                                    className='mt-1 text-gray-500'
                                    icon={faUpDown}
                                />
                            </Disclosure.Button>
                            <div className='h-[1px] bg-gray-300 mb-2 w-full ' />

                            <Disclosure.Panel className="absolutepx-4 pb-2 pt-4 text-sm text-gray-500">
                                <div className="flex flex-col">
                                    <label className="mb-2">
                                        <input
                                            type="checkbox"
                                            checked={isScheduled}
                                            onChange={handleScheduledChange}
                                            className="mr-2 text-sm"
                                        />
                                        Scheduled
                                    </label>
                                    <label className="mb-2 hidden">
                                        <input
                                            type="checkbox"
                                            checked={isNonScheduled}
                                            onChange={handleNonScheduledChange}
                                            className="mr-2 text-sm"
                                        />
                                        Non-Scheduled
                                    </label>
                                    <label className="mb-2">
                                        <input
                                            type="checkbox"
                                            checked={isArchived}
                                            onChange={handleArchivedChange}
                                            className="mr-2 text-sm"
                                        />
                                        Archived
                                    </label>
                                    {/* <button
                                        onClick={applyFilter}
                                        className="mt-2 inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        Apply Filter
                                    </button> */}
                                </div>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
            </div>
        </div>
    );
};

export default FilterComponent;
