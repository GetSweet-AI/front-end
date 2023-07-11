import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Puff } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { setHasSubscription } from '../redux/auth';

function PricingTables() {
  const { user, hasSubscription } = useSelector((state) => state.auth)
  const [isLoading, setIsLoading] = useState(false)

  const payload = {

    name: user?.fullName,
    phone: '123456789',
    email: user?.email,
    userId: user?._id
  };

  const handleClick = async () => {
    setIsLoading(true)
    // const result = await fetch(`https://seashell-app-8amlb.ondigitalocean.app/api/v1/checkout/sk_test_51MbAZNKrjQpaXbt11BqblQtCpraeA1nV1nmEX9rIaZdBpJQlIwrjK2aijRGVmo8WH7H5unbbUL7jRjrRbVagoswv00FlFbimKp`, {
    //   method: 'POST',
    //   body: JSON.stringify(payload)
    // });
    const result = await axios.post(`https://seashell-app-8amlb.ondigitalocean.app/api/v1/checkout/sk_test_51MbAZNKrjQpaXbt11BqblQtCpraeA1nV1nmEX9rIaZdBpJQlIwrjK2aijRGVmo8WH7H5unbbUL7jRjrRbVagoswv00FlFbimKp`,
      {
        name: user?.fullName,
        phone: '123456789',
        email: user?.email,
        userId: user?._id
      }
    )
    //  await fetch.post(`https://seashell-app-8amlb.ondigitalocean.app/api/v1/checkout/sk_test_51MbAZNKrjQpaXbt11BqblQtCpraeA1nV1nmEX9rIaZdBpJQlIwrjK2aijRGVmo8WH7H5unbbUL7jRjrRbVagoswv00FlFbimKp`, {
    //       payload,
    //     });
    setIsLoading(false)

    // const json = await result.json();
    console.log('RESULT: ', JSON.stringify(result.data));
    window.location.href = result.data.session.url;

  };

  const dispatch = useDispatch()

  // Check if the user has already a subscription
  const getHasSubscription = async () => {
    await axios.get(`https://seashell-app-8amlb.ondigitalocean.app/api/v1/has-subscription/${user?.customerId}`).then((res) => {
      dispatch(setHasSubscription(res.data?.hasSubscription))
    })
  }

  useEffect(() => {
    getHasSubscription()
  })

  return (
    <section className="relative  bg-gray-900 border-t border-transparent ">
      {/* Background gradient (dark version only) */}
      <div className="absolute inset-0 opacity-25 bg-gradient-to-b from-gray-800 to-gray-900 pointer-events-none hidden dark:block" aria-hidden="true"></div>
      {/* End background gradient (dark version only) */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12">
            <h2 className="h3 font-red-hat-display mb-4 text-gray-100">{hasSubscription ? "You already have an active subscription.   Enjoy access to premium features!" : "Start building for free, then upgrade to a plan to unleash your content."}</h2>
            {/* <p className="text-xl text-gray-400">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit laborum — semper quis lectus nulla.</p> */}
          </div>

          {/* Pricing tables */}
          {!hasSubscription && <div className="max-w-xs mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-4 items-start sm:max-w-none md:max-w-2xl lg:max-w-none">

            {/* Pricing table 1 */}
            <div className="flex flex-col h-full p-6 bg-gray-800 shadow border-2 border-[#3b82f6]" data-aos="fade-down">
              <div className="grow mb-4 pb-4">
                <div className="flex justify-between items-center mb-1">
                  <div className="text-xl font-bold font-red-hat-display">Yearly</div>
                  <div className="inline-flex px-3 py-1 text-xs font-medium text-white  bg-[#3b82f6]  rounded-full">-40%</div>
                </div>
                <div className="font-red-hat-display inline-flex items-baseline mb-2">
                  <span className="h4 text-gray-400">$</span>
                  <span className="h3 text-white">9.99</span>
                  <span className="font-medium text-gray-500 "> / monthly</span>
                </div>
                <div className="text-gray-300 ">- Generate 10 posts.</div>
              </div>
              <div onClick={handleClick} className="mt-24">
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
                  <span>Copy Text</span>
                </li>


              </ul>
            </div>

          </div>}

        </div>
      </div>
    </section>
  );
}

export default PricingTables;
