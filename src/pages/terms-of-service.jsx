import React from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import logo from "../images/logogetsweet.png";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import {
  ArrowPathIcon,
  Bars3Icon,
  CloudArrowUpIcon,
  FingerPrintIcon,
  LockClosedIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const navigation = [
  { name: "Sign up", href: "/signup" },
  { name: "Sign in", href: "/signin" },
];

export default function TermsOfService() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-white#">
      {/* Header */}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Link to="/" className="-m-1.5 p-1.5">
              {/*<img
                className="h-10 w-auto"
                src={logo}
                alt=""
              />*/}
              <span className="font-bold text-xl text-gray-900" href="/">
                GetSweet.AI
              </span>
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                {item.name}
              </a>
            ))}
          </div>
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <span className="sr-only">GetSweet.AI</span>
              <img className="h-8 w-auto" src={logo} alt="" />

              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>

      <main className="isolate">
        {/* Hero section */}
        <div className="relative pt-12">
          <div
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
          <div className="py-8 sm:py-16">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div>
                <h1>Terms Of Service</h1>
              </div>
              <p>
                Sample Terms of Use 1. Introduction This website is operated by
                [Merchant Name]. The terms “we”, “us”, and “our” refer to
                [Merchant Name]. The use of our website is subject to the
                following terms and conditions of use, as amended from time to
                time (the “Terms”). The Terms are to be read together by you
                with any terms, conditions or disclaimers provided in the pages
                of our website. Please review the Terms carefully. The Terms
                apply to all users of our website, including without limitation,
                users who are browsers, customers, merchants, vendors and/or
                contributors of content. If you access and use this website, you{" "}
              </p>

              <p>
                accept and agree to be bound by and comply with the Terms and
                our Privacy Policy. If you do not agree to the Terms or our
                Privacy Policy, you are not authorized to access our website,
                use any of our website’s services or place an order on our
                website. 2. Use of our Website You agree to use our website for
                legitimate purposes and not for any illegal or unauthorized
                purpose, including without limitation, in violation of any
                intellectual property or privacy law. By agreeing to the Terms,
              </p>

              <h2>Disclaimer</h2>

              <p>
                you represent and warrant that you are at least the age of
                majority in your state or province of residence and are legally
                capable of entering into a binding contract. You agree to not
                use our website to conduct any activity that would constitute a
                civil or criminal offence or violate any law. You agree not to
                attempt to interfere with our website’s network or security
                features or to gain unauthorized access to our systems. You
                agree to provide us with accurate personal information, such as
                your email address, mailing address and other contact details in
                order to complete your order or contact you as needed. You agree
                to promptly update your account and information. You authorize
                us to collect and use this information to contact you in
                accordance with our Privacy Policy. 3.
              </p>
              <p>
                General Conditions We reserve the right to refuse service to
                anyone, at any time, for any reason. We reserve the right to
                make any modifications to the website, including terminating,
                changing, suspending or discontinuing any aspect of the website
                at any time, without notice. We may impose additional rules or
                limits on the use of our website. You agree to review the Terms
                regularly and your continued access or use of our website will
                mean that you agree to any changes. You agree that we will not
                be liable to you or any third party for any modification,
                suspension or discontinuance of our website or for any service,
                content, feature or product offered through our website.
              </p>

              <p>
                4. Products or Services All purchases through our website are
                subject to product availability. We may, in our sole discretion,
                limit or cancel the quantities offered on our website or limit
                the sales of our products or services to any person, household,
                geographic region or jurisdiction. Prices for our products are
                subject to change, without notice. Unless otherwise indicated,
                prices displayed on our website are quoted in Canadian dollars.
                We reserve the right, in our sole discretion, to refuse orders,
                including without limitation, orders that appear to be placed by
                distributors or resellers. If we believe that you have made a
                false or fraudulent order, we will be entitled to cancel the
                order and inform the relevant authorities. We do not guarantee
                the accuracy of the colour or design of the products on our
                website. We have made efforts to ensure the colour and design of
                our products are displayed as accurately as possible on our
                website.
              </p>

              <p>
                5. Links to Third-Party Websites Links from or to websites
                outside our website are meant for convenience only. We do not
                review, endorse, approve or control, and are not responsible for
                any sites linked from or to our website, the content of those
                sites, the third parties named therein, or their products and
                services. Linking to any other site is at your sole risk and we
                will not be responsible or liable for any damages in connection
                with linking. Links to downloadable software sites are for
                convenience only and we are not responsible or liable for any
                difficulties or consequences associated with downloading the
                software. Use of any downloaded software is governed by the
                terms of the license agreement, if any, which accompanies or is
                provided with the software. 6. Use Comments, Feedback, and Other
                Submissions You acknowledge that you are responsible for the
                information, profiles, opinions, messages, comments and any
                other content (collectively, the “Content”) that you post....
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
