import React, { useState, useEffect } from 'react';
import { Disclosure } from '@headlessui/react';
import { faUpDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FilterComponent = ({ label, isImage, isVideo, setIsImage, setIsVideo, applyFilter }) => {

    const handleImageChange = (event) => {
        setIsImage(event.target.checked);
    };

    const handleVideoChange = (event) => {
        setIsVideo(event.target.checked);
    };

    // useEffect(() => {
    //     applyFilter()
    // }, [isImage, isVideo])

    return (
        <div className="w-full  bg-white shadow-sm -mt-[8vh] md:mt-2 rounded-md">
            {/* <div className='p-3'> */}
            <div className=" w-full rounded-2xl bg-white p-3">
                <Disclosure>
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
                                            checked={isImage}
                                            onChange={handleImageChange}
                                            className="mr-2 text-sm"
                                        />
                                        Image
                                    </label>
                                    <label className="mb-2">
                                        <input
                                            type="checkbox"
                                            checked={isVideo}
                                            onChange={handleVideoChange}
                                            className="mr-2 text-sm"
                                        />
                                        Video
                                    </label>
                                </div>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
            </div>
            {/* </div> */}
        </div>
    );
};

export default FilterComponent;
