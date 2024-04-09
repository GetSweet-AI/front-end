import React, { useEffect, useState } from 'react';
import { Disclosure } from '@headlessui/react'
import { faUpDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const FilterComponent = ({ label, filterOptions, setFilterOptions }) => {

    const [open, setOpen] = useState(false);


    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setFilterOptions({ ...filterOptions, [name]: checked });
    };


    return (
        <div className="w-full max-w-md mx-auto bg-white shadow-lg -mt-5 md:mt-2 rounded-lg">
            {/* <h2 className="text-md text-gray-500 font-bold pl-4 py-3">{label}</h2> */}

            <div className='p-3'>
                <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-2">
                    <Disclosure>
                        {({ open }) => (
                            <>
                                <Disclosure.Button className="flex w-full justify-between rounded-lg  px-4 py-2 text-left text-sm font-medium text-gray-600 hover:bg-blue-100 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                                    <span>{label}</span>
                                    {/* <ChevronUpIcon
                                        className={`${open ? 'rotate-180 transform' : ''
                                            } h-5 w-5 text-purple-500`}
                                    /> */}
                                    <FontAwesomeIcon
                                        // className={
                                        //     pathname === "/users"
                                        //         ? "text-[#3b82f6]"
                                        //         : "text-[#fff]"
                                        // }
                                        className='mt-1 text-gray-500'
                                        icon={faUpDown}
                                    />
                                </Disclosure.Button>
                                <div className='h-[1px] bg-gray-300 mb-2 w-full ' />

                                <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
                                    <div>
                                        <div className="flex flex-col">
                                            <label className="mb-2">
                                                <input
                                                    type="checkbox"
                                                    name="isImage"
                                                    checked={filterOptions.isImage}
                                                    onChange={handleCheckboxChange}
                                                    className="mr-2"
                                                />
                                                Image
                                            </label>
                                            <label className="mb-2">
                                                <input
                                                    type="checkbox"
                                                    name="isVideo"
                                                    checked={filterOptions.isVideo}
                                                    onChange={handleCheckboxChange}
                                                    className="mr-2"
                                                />
                                                Video
                                            </label>
                                        </div>

                                    </div>
                                </Disclosure.Panel>
                            </>
                        )}
                    </Disclosure>

                </div>
            </div>
        </div>
    );
};

export default FilterComponent;
