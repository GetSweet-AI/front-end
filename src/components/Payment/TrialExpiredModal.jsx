import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Dialog from '@radix-ui/react-dialog';
import planExpiredImg from '../../images/upgrade-illustration.png'


const TrialExpiredModal = ({ isVisible, onClose }) => {
    const navigate = useNavigate();

    const handleUpgradeClick = () => {
        navigate('/payment');
        onClose(); // Close the modal after navigating
    };

    return (
        <Dialog.Root open={isVisible} onOpenChange={onClose}>
            <Dialog.Portal>
                <Dialog.Overlay className="shadow-md  rounded-md fixed inset-0 bg-opacity-70" />
                <Dialog.Content
                    className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] 
                    max-h-[120vh] w-[90vw] max-w-[550px] translate-x-[-50%] translate-y-[-50%] 
                    rounded-[6px] bg-white p-[25px] 
                    shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none"
                    onEscapeKeyDown={onClose}
                    onPointerDownOutside={(event) => event.preventDefault()}
                >
                    <Dialog.Title className="text-mauve12 text-blue-600 m-0 text-[24px] font-bold">
                        Free Trial Expired
                    </Dialog.Title>
                    <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[16px] leading-normal">
                        Your free trial period has ended.
                        Please upgrade to continue using the app.
                    </Dialog.Description>
                    <img src={planExpiredImg} alt='upgrade-plan-illustration' />
                    <div className="mt-[25px] flex justify-end">
                        <button
                            className="text-pink-500 border-[2px] border-blue-500 hover:scale-110 shadow-md inline-flex h-[40px] items-center
                             justify-center rounded-[7px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
                            onClick={handleUpgradeClick}
                        >
                            Upgrade Now
                        </button>
                    </div>

                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default TrialExpiredModal;
