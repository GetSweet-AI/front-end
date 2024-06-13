import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import React from "react";
import TemplateSelector from "./TemplateSelector"; // Import the new component

function AddNewBrandModal({
  isOpen,
  onCancel,
  handlePreview,
  children,
  brandName,
  setBrandName,
  brandDescription,
  setBrandDescription,
  isLoading,
  userId
}) {
  const [errors, setErrors] = useState({ brandName: "", brandDescription: "" });

  const validateForm = () => {
    let hasErrors = false;
    let errorMessages = { brandName: "", brandDescription: "" };

    if (!brandName.trim()) {
      errorMessages.brandName = "Brand name is required.";
      hasErrors = true;
    }

    if (!brandDescription.trim()) {
      errorMessages.brandDescription = "Brand description is required.";
      hasErrors = true;
    }

    setErrors(errorMessages);
    return !hasErrors;
  };

  const handlePreviewClick = () => {
    if (validateForm()) {
      handlePreview(); // Assuming this is the save function
    }
  };

  const handleSelectTemplate = (template) => {
    setBrandName(template.Title);
    setBrandDescription(template.CompanySector); // Adjust based on how you want to map template fields
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={onCancel}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full md:w-1/3 transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className={`modal ${isOpen ? "visible" : "hidden"} `}>
                    <div className="modal-content ">
                      <h2 className="font-bold text-lg my-4">Add New Brand</h2>

                      <TemplateSelector userId={userId} onSelectTemplate={handleSelectTemplate} />

                      {/* <div className="h-[2px] mr-2 bg-gray-200  mb-2" /> */}

                      <div>
                        <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-bold mb-2">
                            Brand Name
                          </label>
                          <input
                            type="text"
                            value={brandName}
                            onChange={(e) => setBrandName(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          />
                          {errors.brandName && <p className="text-red-500 text-xs italic">{errors.brandName}</p>}
                        </div>

                        <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-bold mb-2">
                            Brand Description
                          </label>
                          <textarea
                            value={brandDescription}
                            onChange={(e) => setBrandDescription(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          />
                          {errors.brandDescription && <p className="text-red-500 text-xs italic">{errors.brandDescription}</p>}
                        </div>
                      </div>
                      <div className="mt-5 flex justify-between">
                        <button
                          onClick={onCancel}
                          className="mr-2 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          Cancel
                        </button>
                        <button
                          disabled={isLoading}
                          onClick={handlePreviewClick}
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          {isLoading ? "Loading ..." : "Preview"}
                        </button>
                      </div>
                    </div>

                    {children}

                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default AddNewBrandModal;
