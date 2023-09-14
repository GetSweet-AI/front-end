import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from '../redux/auth';

export default function MyModal({ isOpen, closeModal, deleteAccount }) {
  const [inputDel, setInputDel] = useState("");
  const [confirmation, setConfirmation] = useState("");

  useEffect(() => {
    if (isOpen) {
      setInputDel("");
      setConfirmation("");
    }
  }, [isOpen]);

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleInputChange = (event) => {
    setInputDel(event.target.value);
  };

  const handleButtonDel = () => {
    if (inputDel === "DELETE") {
      setConfirmation("Successful");

      deleteAccount();
      navigate('/')
      dispatch(logoutUser());

    } else {
      setConfirmation("Denied");
      closeModal();
    }
  };

  const buttonDisabled = inputDel !== "DELETE";
  const buttonClasses = `inline-flex justify-center rounded-md border text-sm font-medium py-2 px-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 transition-colors duration-300 ${buttonDisabled
    ? "bg-gray-300 border-gray-300 text-gray-700 cursor-not-allowed"
    : "bg-red-500 border-transparent text-white hover:bg-red-600"
    }`;
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Delete account
                  </Dialog.Title>
                  <div className="mt-3">
                    <p className="text-sm text-gray-500">
                      If you are sure to continue, type <b>"DELETE"</b>
                    </p>
                  </div>

                  <div className="mt-4 flex">
                    <input
                      className="rounded-md font-medium text-purple-900 py-1 px-3 border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-700"
                      type="text"
                      placeholder="DELETE"
                      value={inputDel}
                      onChange={handleInputChange}
                    />
                  </div>
                  <p className="ml-2">{confirmation}</p>
                  <div className="mt-6 flex justify-end space-x-2">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className={buttonClasses}
                      onClick={handleButtonDel}
                      disabled={buttonDisabled}
                    >
                      Delete
                    </button>
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
