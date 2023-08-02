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
  DocumentArrowUpIcon,
  FingerPrintIcon,
  LockClosedIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
//import { CheckIcon, PlusIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import docPrivacy from "../partials/PrivacyPolicy";

const navigation = [
  { name: "Sign up", href: "/signup" },
  { name: "Sign in", href: "/signin" },
];

export default function PrivacyPolicy() {
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
                <h1>Privacy Policy</h1>
                {docPrivacy.sections.map((section, index) => (
                  <div key={index}>
                    <h2>{section.header}</h2>
                    <p>{section.body}</p>

                    {section.list && section.list.length > 0 && (
                      <>
                        {section.list.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                        <br />
                      </>
                    )}

                    {section.body1 && section.body1.length > 0 && (
                      <div>
                        {section.body1.map((item, index) => (
                          <p key={index}>{item}</p>
                        ))}
                      </div>
                    )}

                    {section.list1 && section.list1.length > 0 && (
                      <>
                        {section.list1.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                        <br />
                      </>
                    )}
                    <div>
                      {section.cuadro && section.cuadro.length > 0 && (
                        <ul>
                          {section.cuadro.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <div>
                      {section.cuadro1 && section.cuadro1.length > 0 && (
                        <ul>
                          {section.cuadro1.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <div>
                      {Array.isArray(section.cuadro2) &&
                        section.cuadro2.length > 0 && (
                          <ul>
                            {section.cuadro2.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        )}
                    </div>

                    <div>
                      {Array.isArray(section.foot) &&
                        section.foot.length > 0 && (
                          <>
                            {section.foot.map((item, index) => (
                              <h6 key={index}>{item}</h6>
                            ))}
                          </>
                        )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
