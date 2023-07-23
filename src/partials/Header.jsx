import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Dropdown from '../utils/Dropdown';
import Transition from '../utils/Transition';
import logo from '../images/logogetsweet.png'
import { useDispatch, useSelector } from 'react-redux';
function Header() {

  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const logout = () => {
    // await signOut(auth);
    dispatch(switchLoginStatus(false))
  };

  const trigger = useRef(null);
  const mobileNav = useRef(null);

  // close the mobile menu on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!mobileNav.current || !trigger.current) return;
      if (!mobileNavOpen || mobileNav.current.contains(target) || trigger.current.contains(target)) return;
      setMobileNavOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close the mobile menu if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!mobileNavOpen || keyCode !== 27) return;
      setMobileNavOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  // Handle light modes
  const [darkMode, setDarkMode] = useState(() => {
    const dark = localStorage.getItem('dark-mode');
    if (dark === null) {
      return true;
    } else {
      return dark === 'true';
    }
  });

  // useEffect(() => {
  //   localStorage.setItem('dark-mode', darkMode)
  //   if (darkMode) {
  //     document.documentElement.classList.add('dark')
  //   } else {
  //     document.documentElement.classList.remove('dark')
  //   }
  // }, [darkMode]);

  return (
    <header className=" shadow-xl shadow-gray-100 fixed     w-full z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">

          {/* Site branding */}
          <div className="shrink-0 mr-5">
            {/* Logo */}
            <Link to="/" className="block" aria-label="Cruip">
              <div className='flex space-x-3'>  <img src={logo} alt="logo" className="w-10 h-10" />
                <p className='flex justify-center mt-2 items-center text-xl font-bold text-blue-900'>
                  GetSweet.AI
                </p>
              </div>

            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex  justify-between   ">
            {/* Desktop sign in links */}
            {!isLoggedIn && <ul className="flex md:justify-end md:flex-wrap items-center">
              <li>
                <Link
                  className="font-medium text-gray-600 decoration-blue-500 decoration-2 underline-offset-2 hover:underline px-3 lg:px-5 py-2 flex items-center transition duration-150 ease-in-out"
                  to="/signin"
                >
                  Sign in
                </Link>
              </li>
              <li className="ml-3">
                <Link className="btn-sm text-white bg-blue-500 hover:bg-blue-600 w-full shadow-sm" to="/signup">
                  Create Account
                </Link>
              </li>
            </ul>}
            {isLoggedIn && <ul className="flex md:justify-end md:flex-wrap items-center">

              <li className="ml-3">
                <Link className="btn-sm text-white bg-blue-500 hover:bg-blue-600 w-full shadow-sm" to="/brand-engagement-builder">
                  Get started
                </Link>
              </li>
            </ul>}
          </nav>

          {/* Mobile menu */}
          <div className="inline-flex md:hidden">

            {/* Hamburger button */}
            <button
              ref={trigger}
              className={`hamburger ${mobileNavOpen && 'active'}`}
              aria-controls="mobile-nav"
              aria-expanded={mobileNavOpen}
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
            >
              <span className="sr-only">Menu</span>
              <svg
                className="w-6 h-6 fill-current text-primary-600 hover:animate-pulse text-gray-600 dark:hover:text-gray-700 transition duration-150 ease-in-out"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect y="4" width="24" height="2" rx="1" />
                <rect y="11" width="24" height="2" rx="1" />
                <rect y="18" width="24" height="2" rx="1" />
              </svg>
            </button>

            {/*Mobile navigation */}
            <Transition
              show={mobileNavOpen}
              tag="ul"
              className="fixed top-0 h-screen -50 left-0 w-full  -ml-16 overflow-scroll   shadow-lg"
              enter="transition ease-out duration-200 transform"
              enterStart="opacity-0 -translate-x-full"
              enterEnd="opacity-100 translate-x-0"
              leave="transition ease-out duration-200"
              leaveStart="opacity-100"
              leaveEnd="opacity-0"
            >
              <nav
                id="mobile-nav"
                ref={mobileNav}
                className="fixed top-0 h-screen z-10 left-0 w-full   -ml-16   bg-gray-900 shadow-lg no-scrollbar"
              >

                <div className="py-6  pl-[64px]">
                  {/* Logo */}
                  <Link to="/" className="flex justify-center py-6 my-4" aria-label="Cruip">
                    <img src={logo} alt="logo" className="w-12 h-12" />
                  </Link>
                  {/* Links */}
                  <ul className='space-y-4'>
                    <li>
                      <Link
                        className="text-sm flex font-medium ml-3 text-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 py-2"
                        to="/signin"
                      >
                        Sign in
                      </Link>
                    </li>
                    <li className="ml-3">
                      <Link className="text-sm flex font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 py-2" to="/signup">
                        Create Account
                      </Link>
                    </li>
                    {/* <li className="py-2 my-2 border-t border-b border-gray-200 dark:border-gray-800">
                      <span className="flex text-gray-600 dark:text-gray-400 py-2">Resources</span>
                      <ul className="pl-4">
                        <li>
                          <Link
                            to="/help"
                            className="text-sm flex font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 py-2"
                          >
                            Help center
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/404"
                            className="text-sm flex font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 py-2"
                          >
                            404
                          </Link>
                        </li>
                      </ul>
                    </li> */}

                  </ul>
                </div>
              </nav>
            </Transition>
          </div>
        </div>
      </div>
    </header >
  );
}

export default Header;
