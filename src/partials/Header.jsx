import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '../images/logogetsweet.png';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import GAHandler from '../partials/ga_gtm_handler';

const handleLinkClick = GAHandler();

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // Handle scroll event
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 100);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Default navigation array to prevent errors if it's not defined
  const navigation = [
    // { name: 'Home', href: '/' },
    // { name: 'Features', href: '/features' },
    // { name: 'Pricing', href: '/pricing' },
    // { name: 'About', href: '/about' },
    { name: 'Sign up', href: '/signup' },
    { name: 'Sign in', href: '/signin' },
  ];

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition duration-300 ease-in-out ${isScrolled ? 'bg-white/80 text-pink-600 shadow-xl' : 'bg-transparent text-gray-900/80'}`}>
      <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="#" className="flex items-center -m-1.5 p-1.5">
            <img className="h-10 w-auto mr-2" src={logo} alt="GetSweet.AI logo icon" />
            <span className={`font-bold text-xl ${isScrolled ? ' text-pink-600' : 'text-gray-900'}`}>GetSweet.AI</span>
          </a>
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
        <div className="hidden lg:flex lg:gap-x-12 lg:align-middle lg:justify-center lg:items-center">
          {!isLoggedIn && (
            <a
              className={`text-sm border-pink-400 border-[2px] rounded-md cursor-pointer px-2 py-1 font-semibold leading-6 ${isScrolled ? 'hover:bg-pink-500 text-pink-600  hover:text-white' : 'text-gray-900 hover:bg-pink-500 hover:text-white'}`}
              onClick={() => navigate('preview')}
            >
              Demo
            </a>
          )}
          {!isLoggedIn && navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`text-sm font-semibold leading-6 ${isScrolled ? ' text-pink-600' : 'text-gray-900'}`}
              onClick={(e) => handleLinkClick(item.gtmtrigger)}
            >
              {item.name}
            </a>
          ))}
          {isLoggedIn && (
            <a
              href="/brand-engagement-builder"
              className={`text-sm font-semibold leading-6 border-2 p-2 rounded-xl ${isScrolled ? 'border-white text-white hover:bg-white hover:text-pink-600' : 'border-gray-400 text-gray-900 hover:bg-pink-600 hover:text-white'}`}
            >
              Get Started
            </a>
          )}
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">GetSweet.AI</span>
              <img className="h-8 w-auto" src={logo} alt="" />
            </a>
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
            {!isLoggedIn ? (
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-200"
                      onClick={(e) => handleLinkClick('mobile_' + item.gtmtrigger)}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-2 py-6">a
                <a
                  href="/brand-engagement-builder"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-200"
                >
                  Get Started
                </a>
              </div>
            )}
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}

export default Header;
