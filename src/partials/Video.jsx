import React, { useState } from 'react'

// import HeroImage from '../images/hero-image-01.jpg';
import Modal from '../utils/Modal';

export default function Video({ link }) {
    const [videoModalOpen, setVideoModalOpen] = useState(false);
    return (
        <div>
            {/* Hero image */}
            <div className='space-y-2'>
                <div className="relative flex justify-center  items-center" data-aos="fade-up" data-aos-delay="200">
                    {/* <img className="mx-auto rounded-xl sm:w-[250px] w-[90%]  sm:h-[160px]" src={HeroImage} alt="Hero" /> */}
                    <a className="absolute group" href="#0" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setVideoModalOpen(true); }} aria-controls="modal">
                        <svg className="w-16 h-16 sm:w-20 sm:h-20 hover:opacity-75 transition duration-150 ease-in-out" viewBox="0 0 88 88" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <lin x1="78.169%" y1="9.507%" x2="24.434%" y2="90.469%" id="a">
                                    <stop stopColor="#EBF1F5" stopOpacity=".8" offset="0%" />
                                    <stop stopColor="#EBF1F5" offset="100%" />
                                </lin>
                            </defs>
                            <circle fill="url(#a)" cx="44" cy="44" r="44" />
                            <path className="fill-current text-orange-600" d="M52 44a.999.999 0 00-.427-.82l-10-7A1 1 0 0040 37V51a.999.999 0 001.573.82l10-7A.995.995 0 0052 44V44c0 .001 0 .001 0 0z" />
                        </svg>
                    </a>
                </div>
                <div className='space-y-2 md:text-start text-center py-4 sm:ml-4'>
                    <h2 className='font-bold  text-orange-500 text-2xl'>
                        Jenaaa
                    </h2>
                    <p className='text-xl font-medium'>Nadaas</p>
                </div>

                {/* Modal */}
                <Modal id="modal" ariaLabel="modal-headline" show={videoModalOpen} handleClose={() => setVideoModalOpen(false)}>
                    <div className="relative pb-9/16">
                        <iframe className="absolute w-full h-full" src={link} title="Video" allowFullScreen></iframe>
                    </div>
                </Modal>

            </div>
        </div>
    )
}