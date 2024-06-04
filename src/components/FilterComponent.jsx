import React, { useState, useEffect } from 'react';
import { Disclosure } from '@headlessui/react';
import { faUpDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FilterComponent = ({ label, isFilterOne, isFilterTwo, setIsFilterOne, setIsFilterTwo, applyFilter, filterOneLabel, filterTwoLabel }) => {

    const handle1stInputChange = (event) => {
        setIsFilterOne(event.target.checked);
    };

    const handleNdVideoChange = (event) => {
        setIsFilterTwo(event.target.checked);
    };

    return (
        <div className="w-full  bg-white shadow-sm -mt-[8vh] md:mt-2 rounded-md">
            <div className=" w-full rounded-2xl bg-white p-3">
                <Disclosure defaultOpen>
                    {({ open }) => (
                        <>
                            <Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-2 text-left text-sm font-medium text-gray-600 hover:bg-blue-100 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                                <span>{label}</span>
                                <FontAwesomeIcon
                                    className='mt-1 text-gray-500'
                                    icon={faUpDown}
                                />
                            </Disclosure.Button>
                            <div className='h-[1px] bg-gray-300 mb-2 w-full ' />

                            <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
                                <div className="flex flex-col">
                                    <label className="mb-2">
                                        <input
                                            type="checkbox"
                                            checked={isFilterOne}
                                            onChange={handle1stInputChange}
                                            className="mr-2 text-sm"
                                        />
                                        {filterOneLabel}
                                    </label>
                                    <label className="mb-2">
                                        <input
                                            type="checkbox"
                                            checked={isFilterTwo}
                                            onChange={handleNdVideoChange}
                                            className="mr-2 text-sm"
                                        />
                                        {filterTwoLabel}
                                    </label>
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
