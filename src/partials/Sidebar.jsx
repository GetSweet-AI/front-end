import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../images/logogetsweet.png";
// import shortLogo from "../images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBlog, faUsers } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { setUserData } from "../redux/auth";
import AvailableTokens from "./AvailableTokens";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const { isLoggedIn, usuario } = useSelector((state) => state.auth);

  const location = useLocation();
  const { pathname } = location;
  const { token, user } = useSelector((state) => state.auth);

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const dispatch = useDispatch();

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  const [userData, setUser] = useState([]);
  const fetchUserData = async () => {
    await axios
      .get(
        `https://seashell-app-2-n2die.ondigitalocean.app/api/v1/auth/users/${user?._id}`
      )
      .then((res) => {
        setUser(res.data);
        dispatch(setUserData(res?.data.user));
        console.log("res?.data :" + JSON.stringify(res?.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector("body").classList.add("sidebar-expanded");
    } else {
      document.querySelector("body").classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  useEffect(() => {
    sidebarOpen && !sidebarExpanded && setSidebarExpanded(true);
  }, [sidebarOpen]);

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0  bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex bg-purple-500 flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-72 lg:w-20 lg:sidebar-expanded:!w-72 2xl:!w-68 shrink-0 p-4 pr-0 transition-all duration-200 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-72"
          }`}
      >
        {/* Sidebar header */}
        <div className="">
          <div className={`flex justify-between pr-3 sm:px-2`}>
            {/* Close button */}
            <button
              ref={trigger}
              className="lg:hidden text-slate-500 hover:text-white"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
            >
              <span className="sr-only">Close sidebar</span>
              <svg
                className="w-6 h-6 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
              </svg>
            </button>
            {/* Logo */}
            <NavLink end to={isLoggedIn ? "/brand-engagement-builder" : "/"}>
              {sidebarExpanded === true ? (
                <div className="flex w-full h-8 items-center justify-center">
                  <img className={`w-[40px] heigh-[40px] object-contain`} src={logo} alt="logo" />
                  <p className="text-white font-bold ml-2">GetSweet.AI</p>
                </div>
              ) : (
                <img
                  className={`hidden bg-red-400 sidebar-expanded:hidden`}
                  src={logo}
                  alt="short logo"
                />
              )}
            </NavLink>
          </div>
        </div>

        {/* Links */}
        <div className="space-y-8 mt-12">
          {/* Pages group */}
          <div>
            <ul className="">
              <li>
                <AvailableTokens
                  sideBarOpen={sidebarExpanded}
                  availableTokens={user?.availableTokens}
                />
              </li>
              {/* Home */}
              <li
                className={`px-3 py-3 last:mb-0 ${pathname === "/brand-engagement-builder"
                  ? "bg-white rounded-l-full"
                  : ""
                  }`}
              >
                <NavLink
                  end
                  to="/brand-engagement-builder"
                  className={`block flex text-white hover:text-white truncate transition duration-150 ${pathname === "/brand-engagement-builder" &&
                    "hover:text-white"
                    }`}
                >
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="icon icon-tabler icon-tabler-home-2"
                      width="24px"
                      height="24px"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke={
                        pathname === "/brand-engagement-builder"
                          ? "#3b82f6"
                          : "#fff"
                      }
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <polyline points="5 12 3 12 12 3 21 12 19 12" />
                      <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                      <rect x="10" y="12" width="4" height="4" />
                    </svg>
                  </div>
                  <div className="flex items-center overflow-hidden">
                    <span
                      className={`text-sm font-semibold ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 ${pathname === "/brand-engagement-builder" &&
                        "text-[#3b82f6]"
                        }`}
                    >
                      Brand Builder
                    </span>
                  </div>
                </NavLink>
              </li>
              <li
                className={`px-3 py-3 last:mb-0 ${pathname === "/posts-feed" ? "bg-white rounded-l-full" : ""
                  }`}
              >
                <NavLink
                  end
                  to="/posts-feed"
                  className={`block flex text-white hover:text-white truncate transition duration-150 ${pathname === "/profile" && "hover:text-white"
                    }`}
                >
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="icon icon-tabler icon-tabler-news"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke={pathname === "/posts-feed" ? "#3b82f6" : "#fff"}
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M16 6h3a1 1 0 0 1 1 1v11a2 2 0 0 1 -4 0v-13a1 1 0 0 0 -1 -1h-10a1 1 0 0 0 -1 1v12a3 3 0 0 0 3 3h11" />
                      <path d="M8 8l4 0" />
                      <path d="M8 12l4 0" />
                      <path d="M8 16l4 0" />
                    </svg>
                  </div>
                  <div className="flex items-center overflow-hidden">
                    <span
                      className={`text-sm font-semibold ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 ${pathname === "/posts-feed" && "text-[#3b82f6]"
                        }`}
                    >
                      Posts Feed
                    </span>
                  </div>
                </NavLink>
              </li>
              {/* {user?.role === "admin" && (
                <li
                  className={`px-3 py-3 last:mb-0 ${pathname === "/users" ? "bg-white rounded-l-full" : ""
                    }`}
                >
                  <NavLink
                    end
                    to="/users"
                    className={`block flex text-white hover:text-white truncate transition duration-150 ${pathname === "/users" && "hover:text-white"
                      }`}
                  >
                    <div>
                      <FontAwesomeIcon className={pathname === "/users" ? "text-[#3b82f6]" : "text-[#fff]"} icon={faUsers} />
                    </div>
                    <div className="flex items-center overflow-hidden">
                      <span
                        className={`text-sm font-semibold ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 ${pathname === "/users" && "text-[#3b82f6]"
                          }`}
                      >
                        Users
                      </span>
                    </div>
                  </NavLink>
                </li>
              )} */}
              {/* Home */}
              <li
                className={`px-3 py-3 last:mb-0 ${pathname === "/payment" ? "bg-white rounded-l-full" : ""
                  }`}
              >
                <NavLink
                  end
                  to="/payment"
                  className={`block flex text-white hover:text-white truncate transition duration-150 ${pathname === "/payment" && "hover:text-white"
                    }`}
                >
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="icon icon-tabler icon-tabler-brand-cashapp"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke={pathname === "/payment" ? "#3b82f6" : "#fff"}
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M17.1 8.648a.568 .568 0 0 1 -.761 .011a5.682 5.682 0 0 0 -3.659 -1.34c-1.102 0 -2.205 .363 -2.205 1.374c0 1.023 1.182 1.364 2.546 1.875c2.386 .796 4.363 1.796 4.363 4.137c0 2.545 -1.977 4.295 -5.204 4.488l-.295 1.364a.557 .557 0 0 1 -.546 .443h-2.034l-.102 -.011a.568 .568 0 0 1 -.432 -.67l.318 -1.444a7.432 7.432 0 0 1 -3.273 -1.784v-.011a.545 .545 0 0 1 0 -.773l1.137 -1.102c.214 -.2 .547 -.2 .761 0a5.495 5.495 0 0 0 3.852 1.5c1.478 0 2.466 -.625 2.466 -1.614c0 -.989 -1 -1.25 -2.886 -1.954c-2 -.716 -3.898 -1.728 -3.898 -4.091c0 -2.75 2.284 -4.091 4.989 -4.216l.284 -1.398a.545 .545 0 0 1 .545 -.432h2.023l.114 .012a.544 .544 0 0 1 .42 .647l-.307 1.557a8.528 8.528 0 0 1 2.818 1.58l.023 .022c.216 .228 .216 .569 0 .773l-1.057 1.057z" />
                    </svg>
                  </div>
                  <div className="flex items-center overflow-hidden">
                    <span
                      className={`text-sm font-semibold ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 ${pathname === "/payment" && "text-[#3b82f6]"
                        }`}
                    >
                      Payment
                    </span>
                  </div>
                </NavLink>
              </li>
              {/* Home */}
              <li
                className={`px-3 py-3 last:mb-0 ${pathname === "/profile" ? "bg-white rounded-l-full" : ""
                  }`}
              >
                <NavLink
                  end
                  to="/profile"
                  className={`block flex text-white hover:text-white truncate transition duration-150 ${pathname === "/profile" && "hover:text-white"
                    }`}
                >
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="icon icon-tabler icon-tabler-user-edit"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke={pathname === "/profile" ? "#3b82f6" : "#fff"}
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                      <path d="M6 21v-2a4 4 0 0 1 4 -4h3.5" />
                      <path d="M18.42 15.61a2.1 2.1 0 0 1 2.97 2.97l-3.39 3.42h-3v-3l3.42 -3.39z" />
                    </svg>
                  </div>
                  <div className="flex items-center overflow-hidden">
                    <span
                      className={`text-sm font-semibold ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 ${pathname === "/profile" && "text-[#3b82f6]"
                        }`}
                    >
                      Account settings
                    </span>
                  </div>
                </NavLink>
              </li>
              {user?.role === "admin" && (
                <li
                  className={`px-3 py-3 last:mb-0 ${pathname === "/users" ? "bg-white rounded-l-full" : ""
                    }`}
                >
                  <NavLink
                    end
                    to="/users"
                    className={`block flex text-white hover:text-white truncate transition duration-150 ${pathname === "/users" && "hover:text-white"
                      }`}
                  >
                    <div>
                      <FontAwesomeIcon
                        className={
                          pathname === "/users"
                            ? "text-[#3b82f6]"
                            : "text-[#fff]"
                        }
                        icon={faUsers}
                      />
                    </div>
                    <div className="flex items-center overflow-hidden">
                      <span
                        className={`text-sm font-semibold ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 ${pathname === "/users" && "text-[#3b82f6]"
                          }`}
                      >
                        Users
                      </span>
                    </div>
                  </NavLink>
                </li>
              )}
              {user?.role === "admin" && (
                <li
                  className={`px-3 py-3 last:mb-0 ${pathname.startsWith("/brand-engagements")
                    ? "bg-white rounded-l-full"
                    : ""
                    }`}
                >
                  <NavLink
                    end
                    to="/brand-engagements"
                    className={`block flex text-white hover:text-white truncate transition duration-150 ${pathname.startsWith("/brand-engagements") &&
                      "hover:text-white"
                      }`}
                  >
                    <div>
                      <FontAwesomeIcon
                        className={
                          pathname.startsWith("/brand-engagements")
                            ? "text-[#3b82f6]"
                            : "text-[#fff]"
                        }
                        icon={faBlog}
                      />
                    </div>
                    <div className="flex items-center overflow-hidden">
                      <span
                        className={`text-sm font-semibold ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200 ${pathname.startsWith("/brand-engagements") &&
                          "text-[#3b82f6]"
                          }`}
                      >
                        Brand engagements
                      </span>
                    </div>
                  </NavLink>
                </li>
              )}

              <li
                className={`px-3 py-3 rounded-sm last:mb-0 bg-purple-500`}
              ></li>
            </ul>
          </div>
        </div>

        {/* Expand / collapse button */}
        <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="px-3 py-3">
            <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg
                className="w-6 h-6 fill-current sidebar-expanded:rotate-180"
                viewBox="0 0 24 24"
              >
                <path
                  className="text-white"
                  d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"
                />
                <path className="text-[#ADB5CC]" d="M3 23H1V1h2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
