import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { logoutUser } from '../redux/auth';

function DashboardHeader({
  sidebarOpen,
  setSidebarOpen
}) {

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
              onClick={(e) => { e.stopPropagation(); setSidebarOpen(!sidebarOpen); }}
            >
              <span className="sr-only">Open sidebar</span>
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="5" width="16" height="2" />
                <rect x="4" y="11" width="16" height="2" />
                <rect x="4" y="17" width="16" height="2" />
              </svg>
            </button>

          </div>

          {/* Header: Right side */}
          <div className="flex items-center space-x-3">
            <hr className="w-px h-6 bg-slate-200 mx-3" />
            {/* <UserMenu align="right" /> */}
            <div
              className="font-medium cursor-pointer text-sm text-slate-800 hover:text-slate-600 flex items-center py-1 px-3"
              to="/signin"
              onClick={logOut}
            >
              <svg
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
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke="#CCCCCC"
                  stroke-width="0.72"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <polyline
                    id="secondary"
                    points="6 15 3 12 6 9"
                    style={{
                      fill: "none",
                      stroke: "#6d7eef",
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
                      stroke: "#6d7eef",
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

          </div>

        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;