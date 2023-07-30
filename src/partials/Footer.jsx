import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logogetsweet.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBlog, faUsers, faCoffee } from "@fortawesome/free-solid-svg-icons";

function Footer() {
  return (
    <footer>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-8 md:py-12">
          {/* Top area */}
          <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between mb-12 md:mb-6">
            <div className="shrink-0 mr-4">
              {/* Logo */}
              <Link className="inline-flex group mb-8 sm:mb-0" to="/" aria-label="Cruip">
                {/* <svg
                  className="fill-blue-500 group-hover:fill-blue-600 transition duration-150 ease-in-out w-8 h-8"
                  width="32"
                  height="32"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m7.799 4.47.325.434a19.264 19.264 0 0 0 4.518 4.204l.27.175-.013.257a17.638 17.638 0 0 1-.437 2.867l-.144.564a18.082 18.082 0 0 1-2.889 5.977c2.272.245 4.492.88 6.5 1.886 1.601.788 3.062 1.798 4.344 2.972l.142.135-.017.232a17.034 17.034 0 0 0 1.227 7.504l-.724.323c-1.555-2.931-4.113-5.287-7.19-6.632-3.075-1.351-6.602-1.622-9.857-.844-.822.194-1.532.094-2.146-.183a3.138 3.138 0 0 1-1.29-1.146l-.076-.133-.078-.154-.085-.201a2.893 2.893 0 0 1-.095-1.694c.174-.624.55-1.2 1.239-1.67 2.734-1.85 4.883-4.537 5.944-7.68.704-2.076.925-4.32.633-6.545l-.101-.647Zm4.674-.284.16.2a15.87 15.87 0 0 0 5.629 4.322c3.752 1.76 8.363 2.075 12.488.665.419-.14.78-.044 1.002.158l.106.12.066.11.026.063c.125.33.024.751-.4.994-3.404 1.905-5.92 5.05-6.98 8.573a13.967 13.967 0 0 0 .727 10.055l.241.484-.724.323c-.913-2.227-2.326-4.302-4.12-6.05l-.28-.262.026-.305a16.667 16.667 0 0 1 1.121-4.652l.206-.488c1.05-2.443 2.676-4.59 4.664-6.293-3.064.442-6.273.17-9.243-.858a19.036 19.036 0 0 1-4.072-1.93l-.204-.132.017-.322a18.337 18.337 0 0 0-.415-4.605l-.04-.17ZM10.957 0a18.125 18.125 0 0 1 1.424 3.792l.092.394-.174-.219A14.803 14.803 0 0 1 10.235.322L10.957 0ZM7.046 1.746c.277.725.494 1.463.653 2.206l.1.519-.012-.016a17.99 17.99 0 0 1-1.203-1.891l-.262-.495.724-.323Z" />
                </svg> */}
                <div className='flex justify-center items-center'>
                  <img src={logo} alt="logo" className='' width="60" />
                </div>
              </Link>
            </div>

          </div>
          {/* Bottom area */}
          <div className="text-center md:flex md:items-center md:justify-between mb-8 md:mb-6">
            {/* Social links */}
            <ul className="inline-flex mb-4 md:order-2 md:ml-4 md:mb-0">
              <li>
                <button
                  className="btn btn-primary rounded-circle"
                  aria-label="Slack"
                >
                  <FontAwesomeIcon icon={faCoffee} />
                </button>
              </li>
            </ul>
            {/* Left links */}
            <div className="text-sm font-medium md:order-1 space-x-6 mb-2 md:mb-0">
              <a className="text-gray-500 decoration-blue-500 decoration-2 underline-offset-2 hover:underline" href="#0">
                About
              </a>
              <a className="text-gray-500 decoration-blue-500 decoration-2 underline-offset-2 hover:underline" href="#0">
                Get in touch
              </a>
              <a className="text-gray-500 decoration-blue-500 decoration-2 underline-offset-2 hover:underline" href="#0">
                Privacy &amp; Terms
              </a>
            </div>
          </div>
          {/* Bottom notes */}
          <div className="text-xs text-gray-400 text-center md:text-left">
            For help, please contact us at{' '}
            <a className="font-medium text-blue-500 decoration-blue-500 underline-offset-2 hover:underline" href="#0">
              sales@getsweet.ai
            </a>
            .
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
