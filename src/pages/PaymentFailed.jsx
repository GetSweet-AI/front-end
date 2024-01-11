import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../partials/Header';
import PageIllustration from '../partials/PageIllustration';
import Footer from '../partials/Footer';

import logo from '../images/logogetsweet.png';

function PaymentFailed() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

      {/* Site header */}
      <Header />

      {/* Page content */}
      <main className="grow">

        {/* Page illustration */}
        <div className="relative max-w-6xl mx-auto h-0 pointer-events-none -z-1" aria-hidden="true">
          <PageIllustration />
        </div>

        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              <div className="max-w-3xl mx-auto text-center">


                <div className="">
                  <h1 className="h3 font-red-hat-display mb-8">

                    It seems there was an issue processing the payment.</h1>
                  <h2 className="h3 font-red-hat-display mb-8">

                    <a href='/brand-engagement-builder' className='text-pink-500 hover:text-white hover:bg-pink-400 border-pink-600 border-2 p-3 rounded-xl'>Please try again.</a></h2>
                  <Link className="btn text-white bg-pink-99 inline-flex items-center" to="/">
                    <span>Back to home</span>
                    <svg className="w-3 h-3 shrink-0 mt-px ml-2" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path className="fill-current" d="M6.602 11l-.875-.864L9.33 6.534H0v-1.25h9.33L5.727 1.693l.875-.875 5.091 5.091z" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Site footer */}
      <Footer />

    </div>
  );
}

export default PaymentFailed;
