import React, { useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../redux/auth';
import userPic from "../images/user.png";
import Greeting from "./Greeting";
import { Menu, Transition } from '@headlessui/react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserEdit } from "@fortawesome/free-solid-svg-icons";

function DashboardHeader({
  sidebarOpen,
  setSidebarOpen,

}) {

  const { user } = useSelector((state) => state.auth);
  const fullName = user ? user.fullName : "";
  const greeting = Greeting();
  const userPicture = userPic;
  const capiFullname = fullName.charAt(0).toUpperCase() + fullName.slice(1);
  const [searchModalOpen, setSearchModalOpen] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();



  //Sign Out user
  const logOut = () => {
    dispatch(logoutUser());
    navigate("/");
    // setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="sticky top-0 bg-white border-b border-slate-200 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">

          {/* Header: Left side */}
          <div className="flex">

            {/* Hamburger button */}
            <button
              className="text-slate-500 hover:text-slate-600 lg:hidden"
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              onClick={(e) => {
                e.stopPropagation();
                setSidebarOpen(!sidebarOpen);
              }}
            >
              {/* <span className="sr-only">Open sidebar</span> */}

              <svg
                className="w-6 h-6 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="4" y="5" width="16" height="2" />
                <rect x="4" y="11" width="16" height="2" />
                <rect x="4" y="17" width="16" height="2" />
              </svg>
            </button>
          </div>

          {/* Header: Right side */}
          <div className="flex items-center space-x-3">
            <hr className="w-px h-6 bg-slate-200 mx-3" />


            <div>
              <p>
                {greeting}  <span className='text-pink-600'>{capiFullname}!</span>
              </p>
            </div>

            {/* <UserMenu align="right" /> */}
            {/* Profile dropdown */}

            <Menu as="div" className="relative ml-3">
              <div>
                <Menu.Button className="relative flex rounded-full text-sm focus-outline-none focus:ring focus:ring-white focus:ring-offset-1 focus:ring-offset-blue-700 outline outline-1 outline-blue-300 outline-offset-2">
                  <span className="absolute" />
                  <img
                    className="h-8 w-8 rounded-full"
                    src={user?.picture || userPicture}
                    alt="/user.png"
                  />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        className="font-medium cursor-pointer text-sm text-slate-800 hover:text-slate-600 flex items-center py-1 px-3"
                        href="/profile"
                      >
                        <FontAwesomeIcon
                          icon={faUserEdit}
                          className={`mr-4 ${active ? 'text-blue-500' : 'text-blue-800'}`}
                        />
                        <span>Account settings</span>
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        className="font-medium cursor-pointer text-sm text-slate-800 hover:text-slate-600 flex items-center py-1 px-3"
                        to="/signin"
                        onClick={logOut}
                      >
                        <svg

                          fill="#000000"
                          width="18px"
                          height="18x"
                          viewBox="0 0 24 24"
                          id="sign-out-left-2"
                          data-name="Line Color"
                          xmlns="http://www.w3.org/2000/svg"
                          class="icon line-color"
                          transform="matrix(-1, 0, 0, 1, 0, 0)"
                        >
                          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinejoin="round"
                            stroke="#CCCCCC"
                            stroke-width="0.72"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            <polyline
                              id="secondary"
                              points="6 15 3 12 6 9"
                              style={{
                                fill: "none",
                                stroke: active ? "pink" : "#6d7eef",
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeWidth: "2.4",
                              }}
                            ></polyline>
                            <line
                              id="secondary-2"
                              data-name="secondary"
                              x1="3"
                              y1="12"
                              x2="17"
                              y2="12"
                              style={{
                                fill: "none",
                                stroke: active ? "pink" : "#6d7eef",
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeWidth: "2.4",
                              }}
                            ></line>
                            <path
                              id="primary"
                              d="M10,8V5a1,1,0,0,1,1-1h9a1,1,0,0,1,1,1V19a1,1,0,0,1-1,1H11a1,1,0,0,1-1-1V16"
                              style={{
                                fill: "none",
                                stroke: "#4446e4",
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeWidth: "2.5",
                              }}
                            ></path>
                          </g>
                        </svg>{" "}
                        <span className="ml-4 font-medium">Sign Out</span>
                      </a>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>



            {/*
            <div
              className="font-medium cursor-pointer text-sm text-slate-800 hover:text-slate-600 flex items-center py-1 px-3"
              to="/signin"
              onClick={logOut}


            >
              
          
                fill="#000000"
                width="16px"
                height="16x"
                viewBox="0 0 24 24"
                id="sign-out-left-2"
                data-name="Line Color"
                xmlns="http://www.w3.org/2000/svg"
                class="icon line-color"
                transform="matrix(-1, 0, 0, 1, 0, 0)"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  
                  strokeLinejoin="round"
                  stroke="#CCCCCC"
                  stroke-width="0.72"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <polyline
                    id="secondary"
                    points="6 15 3 12 6 9"
                    style={{
                      fill: "none",
                      
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: "2.4",
                    }}
                  ></polyline>
                  <line
                    id="secondary-2"
                    data-name="secondary"
                    x1="3"
                    y1="12"
                    x2="17"
                    y2="12"
                    style={{
                      fill: "none",
                    
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: "2.4",
                    }}
                  ></line>
                  <path
                    id="primary"
                    d="M10,8V5a1,1,0,0,1,1-1h9a1,1,0,0,1,1,1V19a1,1,0,0,1-1,1H11a1,1,0,0,1-1-1V16"
                    style={{
                      fill: "none",
                      stroke: "#4446e4",
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: "2.4",
                    }}
                  ></path>
                </g>
              </svg>{" "}
              <span className="ml-2">Sign Out</span>
            </div>
            
            */}

          </div>
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;