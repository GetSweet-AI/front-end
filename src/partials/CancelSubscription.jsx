import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import React from "react";

export default function CancelSubscription({ isOpen, onCancel, onConfirm, cancelMessage }) {
  return (
    <>
      <Transition appear show={isOpen}
        as={Fragment}>
        <Dialog as="div" className="relative z-10"
          onClose={onCancel}>
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className={`modal ${isOpen ? "visible" : "hidden"}`}>
                    <div className="modal-content">
                      <h2 className="font-bold text-lg">Cancel Subscription</h2>
                      <p className="mt-2">Are you sure you want to cancel?</p>
                      <div className="mt-5 flex justify-end">
                        <button
                          onClick={onCancel}
                          className="mr-2 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-invisible:ring "
                        >
                          Cancel
                        </button>
                        <button
                          onClick={onConfirm}
                          className=" inline-flex justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-200 focus:outline-none focus-invisible:ring"
                        >
                          {cancelMessage}
                        </button>
                      </div>
                    </div>
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
