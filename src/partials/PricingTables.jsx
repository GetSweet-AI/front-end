import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Puff } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { setHasSubscription } from '../redux/auth';
import { useNavigate, useNavigation } from 'react-router-dom';
import { RadioGroup } from '@headlessui/react';
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import CancelSubscription from './CancelSubscription';

function PricingTables({ planInfos }) {

  const { user, hasSubscription } = useSelector((state) => state.auth)
  const [isLoading, setIsLoading] = useState(false)
  const [isPlansLoading, setIsPlansLoading] = useState(false)

  const navigate = useNavigate()

  const payload = {
    name: user?.fullName,
    phone: '123456789',
    email: user?.email,
    userId: user?._id
  };

  const handleClick = async (plan) => {
    setIsLoading(true)
    const result = await axios.post("http://localhost:5000/api/v1/checkout",
      {
        name: user?.fullName,
        phone: '123456789',
        email: user?.email,
        userId: user?._id,
        plan: plan
      }
    )
    //  await fetch.post(`http://localhost:5000/api/v1/checkout/sk_test_51MbAZNKrjQpaXbt11BqblQtCpraeA1nV1nmEX9rIaZdBpJQlIwrjK2aijRGVmo8WH7H5unbbUL7jRjrRbVagoswv00FlFbimKp`, {
    //       payload,
    //     });
    setIsLoading(false)

    // const json = await result.json();
    console.log('RESULT: ', JSON.stringify(result.data));
    window.location.href = result.data.session.url;

  };

  const dispatch = useDispatch()

  // const navigate = useNavigate
  // Check if the user has already a subscription
  const getHasSubscription = async () => {
    await axios.get(`http://localhost:5000/api/v1/has-subscription/${user?.customerId}`).then((res) => {
      dispatch(setHasSubscription(res.data?.hasSubscription))
    })
  }

  const [subscriptionStatus, setSubscriptionStatus] = useState(null)
  const [cancelMessage, setCancelMessage] = useState(null)

  const getSubscriptionStatus = async () => {
    await axios.get(`http://localhost:5000/api/v1/subscriptions/customer/${user?.customerId}`)
      .then((res) => {
        axios.get(`http://localhost:5000/api/v1/${res.data?.subscriptionIds[0]}/status`)
          .then((response) => {
            setSubscriptionStatus(response.data?.status)
          })
      })
  }

  const cancelSubscription = async () => {
    await axios.get(`http://localhost:5000/api/v1/subscriptions/customer/${user?.customerId}`)
      .then((res) => {
        axios.post(`http://localhost:5000/api/v1/cancel-subscription`, {
          subscriptionId: res.data?.subscriptionIds[0]
        })
          .then((response) => {
            setCancelMessage(response.data?.message)
            getHasSubscription()

          })
      })
    setIsOpen(false)
  }


  // TO-DO

  //Add modal
  //Put cancelSubscription on confirm modal function
  //Add close modal here 

  function handleDownloadInvoice() {
    // Check if the user object exists and contains the invoiceUrl property
    if (user?.invoiceUrl) {
      // Navigate to user?.invoiceUrl
      window.location.href = user.invoiceUrl;
    }
  }

  useEffect(() => {
    getHasSubscription()
    getSubscriptionStatus()
  }, [])


  const [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function confirmCancelationModal() {
    cancelSubscription()
  }

  // console.log("isOpen :" + isOpen)

  return (
    <section className="relative  bg-gray-900 border-t border-transparent ">
      {/* Background gradient (dark version only) */}
      <div className="absolute inset-0 opacity-25 bg-gradient-to-b from-gray-800 to-gray-900 pointer-events-none hidden dark:block" aria-hidden="true"></div>
      {/* End background gradient (dark version only) */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">

          {/* Section header */}
          {user?.Plan !== 'none' && <div className="max-w-3xl mx-auto text-center pb-12">
            <h2 className="h3 font-red-hat-display mb-4 text-gray-100">{hasSubscription ? `You're now on ${user?.Plan} plan. Your subscription is ${subscriptionStatus}` : "Start building for free, then upgrade to a plan to unleash your content."}</h2>
          </div>}
          {hasSubscription &&
            <div className='flex flex-col justify-center'>
              <div className='flex flex-col justify-center'>
                <div className='flex md:flex-row flex-col md:space-x-3'>
                  <div onClick={handleDownloadInvoice} className='mb-2 rounded-md  font-bold text-center z-6 text-white bg-gradient-to-r from-[#6366ff] to-[#373afd] py-3 w-full md:w-1/2' >
                    Download Invoice
                  </div>
                  <button
                    onClick={() => setIsOpen(true)}
                    className='mb-2 rounded-md  cursor-pointer 
                   font-bold text-center z-6 text-white bg-gradient-to-r
                    from-[#f22323] to-[#e61911] py-3  w-full md:w-1/2' >
                    Cancel Subscription
                  </button>
                </div>
              </div>
              <div className='flex flex-col justify-center'>

              </div>
            </div>
          }

          {/* Pricing tables */}
          {(user?.Plan === 'none' || (!hasSubscription && !isPlansLoading))
            && <div className="max-w-xs mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-4 items-start sm:max-w-none md:max-w-2xl lg:max-w-none">

              {/* Pricing table 1 */}
              <div className="flex flex-col h-full p-6 bg-gray-800 shadow border-2 border-[#3b82f6]" data-aos="fade-down">
                <div className="grow mb-4 pb-4">
                  <div className="flex justify-between items-center mb-1">
                    <div className="text-xl font-bold font-red-hat-display"></div>
                    <div className="inline-flex px-3 py-1 text-xs font-medium text-white  bg-[#3b82f6]  rounded-full"></div>
                  </div>
                  <div className="font-red-hat-display inline-flex items-baseline mb-b mt-6">
                    <span className="h4 text-gray-400">$</span>
                    <span className="h3 text-white">

                      {(planInfos.find(plan => plan.id === 'price_1O729YEDPwNjcL6iScRkv2Iy'))?.price}
                    </span>
                    <span className="font-medium text-gray-500 "> / month</span>
                  </div>
                  <div className="text-gray-300 ">- Generate 5 posts.</div>
                </div>
                <div onClick={() => handleClick("Starter Plan")} className="mt-24">
                  <a className="btn-sm text-white bg-[#3b82f6] hover:bg-[#145aca] w-full" href="#0">Go Premium</a>
                </div>
                {isLoading && <div className="z-50 absolute top-[50%] left-[50%] -translate-x-[50%]"> <Puff
                  height="100"
                  width="100"
                  color="#4446e4"
                  secondaryColor='#4446e4'
                  radius='12.5'
                  ariaLabel="mutating-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
                </div>}
              </div>
              {/* Pricing table 2 */}
              <div className="flex flex-col h-full p-6 bg-gray-800 shadow border-2 border-[#3b82f6]" data-aos="fade-down">
                <div className="grow mb-4 pb-4">
                  <div className="flex justify-between items-center mb-1">
                    <div className="text-xl font-bold font-red-hat-display"></div>
                    <div className="inline-flex px-3 py-1 text-xs font-medium text-white  bg-[#3b82f6]  rounded-full">-5%</div>
                  </div>
                  <div className="font-red-hat-display inline-flex items-baseline mb-2">
                    <span className="h4 text-gray-400">$</span>
                    <span className="h3 text-white">{(planInfos.find(plan => plan.id === 'price_1MlQ9oEDPwNjcL6iRrBxLjD8'))?.price}</span>
                    <span className="font-medium text-gray-500 "> / month</span>
                  </div>
                  <div className="text-gray-300 ">- Generate 10 posts.</div>
                </div>
                <div onClick={() => handleClick("Growth")} className="mt-24">
                  <a className="btn-sm text-white bg-[#3b82f6] hover:bg-[#145aca] w-full" href="#0">Go Premium</a>
                </div>
                {isLoading && <div className="z-50 absolute top-[50%] left-[50%] -translate-x-[50%]"> <Puff
                  height="100"
                  width="100"
                  color="#4446e4"
                  secondaryColor='#4446e4'
                  radius='12.5'
                  ariaLabel="mutating-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
                </div>}
              </div>
              {/* Pricing table 3 */}
              <div className="flex flex-col h-full p-6 bg-gray-800 shadow border-2 border-[#3b82f6]" data-aos="fade-down">
                <div className="grow mb-4 pb-4">
                  <div className="flex justify-between items-center mb-1">
                    <div className="text-xl font-bold font-red-hat-display"></div>
                    <div className="inline-flex px-3 py-1 text-xs font-medium text-white  bg-[#3b82f6]  rounded-full">-10%</div>
                  </div>
                  <div className="font-red-hat-display inline-flex items-baseline mb-2">
                    <span className="h4 text-gray-400">$</span>
                    <span className="h3 text-white">{(planInfos.find(plan => plan.id === 'price_1MlR1jEDPwNjcL6i4ZgxVOGg'))?.price}</span>
                    <span className="font-medium text-gray-500 "> / month</span>
                  </div>
                  <div className="text-gray-300 ">- Generate 30 posts.</div>
                </div>
                <div onClick={() => handleClick("Business")} className="mt-24">
                  <a className="btn-sm text-white bg-[#3b82f6] hover:bg-[#145aca] w-full" href="#0">Go Premium</a>
                </div>
                {isLoading && <div className="z-50 absolute top-[50%] left-[50%] -translate-x-[50%]"> <Puff
                  height="100"
                  width="100"
                  color="#4446e4"
                  secondaryColor='#4446e4'
                  radius='12.5'
                  ariaLabel="mutating-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
                </div>}
              </div>



              {/* Pricing features */}
              <div className="sm:order-first">
                <div className="text-right hidden sm:block">
                  <svg className="inline-flex -mt-3 mr-5 mb-3" width="86" height="25" xmlns="http://www.w3.org/2000/svg">
                    <path className="fill-current text-gray-600" d="M80.959 10.448l-5.502-8.292 1.666-1.105 8.596 12.953-15.534.62-.08-1.999 9.944-.397-7.182-3.672C45.251-3.737 21.787 1.633 2.216 24.726L.69 23.435C20.836-.338 45.252-5.926 73.73 6.752l7.23 3.696z" />
                  </svg>
                </div>
                <div className="text-lg font-bold font-red-hat-display mb-4 mt-4 sm:mt-0 text-gray-100">All plans include:</div>
                <ul className="text-gray-400 -mb-2 grow">
                  <li className="flex items-center mb-2">
                    <svg className="w-3 h-3 fill-current text-teal-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <span>Generate brand engagement</span>
                  </li>
                  <li className="flex items-center mb-2">
                    <svg className="w-3 h-3 fill-current text-teal-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <span>Save brand engagement</span>
                  </li>
                  <li className="flex items-center mb-2">
                    <svg className="w-3 h-3 fill-current text-teal-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <span>Generate/download video</span>
                  </li>
                  <li className="flex items-center mb-2">
                    <svg className="w-3 h-3 fill-current text-teal-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                    </svg>
                    <span>Copy Text</span>
                  </li>


                </ul>
              </div>
              {/* Cancel plan */}


            </div>}
          {/* {isPlansLoading && "Loading payment page..."} */}

        </div>
      </div>
      <CancelSubscription
        isOpen={isOpen}
        onConfirm={confirmCancelationModal}
        onCancel={closeModal}
        cancelMessage={cancelMessage !== null ? cancelMessage : " Cancel Subscription"}

      />
    </section>
  );
}

export default PricingTables;


function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}