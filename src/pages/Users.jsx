import React, { useEffect, useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import SearchForm from "../partials/SearchForm";
import FilterButton from "../components/DropdownFilter";
import BrandEngagementCard from "../partials/BrandEngagementCard";
import PaginationNumeric from "../partials/PaginationNumeric";
import rolling from "../images/rolling.svg";
import Image01 from "../images/user-28-01.jpg";
import Image02 from "../images/user-28-02.jpg";
import DashboardHeader from "../partials/DashboardHeader";
import Select from "react-select";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";
import {
  faArrowsRotate,
  faL,
  faTrashAlt,
  faPlus
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { targetAudienceOptions } from "../constants/objects";
import brandTones from "../constants/brandTones";
import postTypeOptions from "../constants/postTypeOtions";
import { clearMessage, setMessage } from "../redux/message";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MutatingDots } from "react-loader-spinner";
import AddNewUserModal from "../partials/AddNewUserModal";
import { formatReadableDate } from "../utils/formatReadableDate";

function Users() {
  const dispatch = useDispatch();

  const [isVisible, setIsVisible] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [engagements, setEngagements] = useState([]);
  const [result, setResult] = useState(null);
  const { token, user } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const [isLoading, setIsLoading] = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [users, setUsers] = useState([]);

  // const fetchUsers = async () => {
  //   setIsLoading(true)
  //   await axios
  //     .get(
  //       `https://seashell-app-2-n2die.ondigitalocean.app/api/v1/admin/users?userId=${user?._id}`
  //     )
  //     .then((res) => {
  //       setUsers(res.data);
  //       console.log("res?.data :" + JSON.stringify(res?.data));
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   setIsLoading(false)
  // };

  // useEffect(() => {
  //   fetchUsers();
  // }, []);

  //pagination

  const [pageNumber, setPageNumber] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);

  const pages = new Array(numberOfPages).fill(null).map((v, i) => i);
  async function fetchUsersData(user, pageNumber) {
    try {
      const response = await axios.get(
        `https://seashell-app-2-n2die.ondigitalocean.app/api/v1/admin/users?userId=${user?._id}&page=${pageNumber}`
      );
      const { totalPages, users } = response.data;
      setUsers(users);
      setNumberOfPages(totalPages);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  useEffect(() => {
    fetchUsersData(user, pageNumber);
  }, [pageNumber]);

  const updateRole = async (userId) => {
    await axios
      .put(
        `https://seashell-app-2-n2die.ondigitalocean.app/api/v1/admin/users/${userId}/update-role`
      )
      .then((res) => {
        fetchUsersData(user, pageNumber);
        toast.success("User role updated");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteUser = async (userId) => {
    await axios
      .delete(
        `https://seashell-app-2-n2die.ondigitalocean.app/api/v1/auth/users/${userId}`
      )
      .then((res) => {
        fetchUsersData(user, pageNumber);
        toast.success("User deleted successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error(error);
      });
  };

  const gotoPrevious = () => {
    setPageNumber(Math.max(0, pageNumber - 1));
  };

  const gotoNext = () => {
    setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
  };

  const [search, setSearch] = useState('')
  const handleChange = (e) => {
    setSearch(e.target.value)
  };


  console.log('Search : ' + search)
  // console.log("Users : ")

  const [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }



  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        {/*  Site header */}
        <DashboardHeader
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <main>
          {isLoading && (
            <div className="z-50 absolute top-[50%] left-[50%] -translate-x-[50%]">
              <MutatingDots
                height="100"
                width="100"
                color="#1c7aed"
                secondaryColor="#3078fd"
                radius="12.5"
                ariaLabel="mutating-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            </div>
          )}
          <div className="px-4 sm:px-6 lg:px-8 pt-8 w-full max-w-9xl mx-auto">
            {/* Page header */}
            <div className="h-screen ">
              {/* Left: Title */}
              <div className="mb-4 sm:mb-0 flex md:justify-between md:flex-row flex-col">
                <h1 className="text-2xl md:text-3xl text-blue-500 font-bold">
                  Users
                </h1>
                <button
                  className="px-2 md:py-1 py-2 bg-purple-500 md:mt-0 mt-2  text-center text-white rounded text-sm flex items-center font-normal"
                  onClick={() => setIsOpen(true)}
                >
                  <FontAwesomeIcon icon={faPlus} className="mr-1 " />
                  Add New User
                </button>
                <input
                  type="text"
                  name="search"
                  placeholder="Search by name or email"
                  onChange={handleChange}
                  className="form-input focus:border-slate-300 mb-1"
                />
              </div>
              <div className="w-full h-auto mt-10 overflow-x-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-blue-300 overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-purple-500 text-white">
                      <th className="py-3 px-6 text-left rounded-tl-lg">
                        Name
                      </th>
                      <th className="py-3 px-6 text-left">Email</th>
                      <th className="py-3 px-6 text-left">Company</th>
                      <th className="py-3 px-6 text-left">Plan</th>
                      <th className="py-3 px-6 text-left">Available Tokens</th>

                      <th className="py-3 px-6 text-left ">Role</th>
                      <th className="py-3 px-6 text-left ">lastLoggedIn</th>
                      <th className="py-3 px-6 text-left ">Nbr of BEs</th>
                      <th className="py-3 px-6 text-left rounded-tr-lg">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users?.
                      filter((customer) => {
                        // const { email } = customer?.user;
                        if (search == "") {
                          return customer;
                        } else if (customer?.email !== null &&
                          (customer?.email.toLowerCase().includes(search.toLocaleLowerCase()) || customer?.fullName.toLowerCase().includes(search.toLocaleLowerCase()))
                        ) {
                          return customer;
                        }
                      })
                      .map((client, index) => (
                        <tr
                          key={client._id}
                          className={
                            index % 2 === 0
                              ? "bg-white"
                              : "bg-blue-100 rounded-full"
                          }
                        >
                          <td className="py-4 px-6 md:px-8 border-b">
                            {client.fullName}
                          </td>
                          <td className="py-4 px-2 border-b">{client.email}</td>
                          <td className="py-4 px-6 border-b">{client.company}</td>
                          <td className="py-4 px-6 border-b">{client.Plan}</td>
                          <td className="py-4 px-6 border-b text-center">
                            {client.availableTokens}
                          </td>
                          {/* <td className="py-4 px-6 border-b text-center">
                       
                          </td> */}
                          <td className="py-4 px-6 border-b">
                            <span
                              onClick={() => updateRole(client._id)}
                              className="bg-purple-500 flex items-center w-fit px-4 py-2 rounded-xl text-white uppercase text-sm cursor-pointer"
                            >
                              {client.role}{" "}
                              <FontAwesomeIcon
                                className="ml-2 mb-1"
                                icon={faArrowsRotate}
                              />
                            </span>
                          </td>
                          <td className="py-4 px-6 border-b">     {client?.lastLoggedIn && formatReadableDate(client?.lastLoggedIn)}</td>
                          <td className="py-4 px-6 border-b">     {client?.countBrandEngagements}</td>
                          <td className="py-4 px-6 border-b">
                            <span
                              onClick={() => deleteUser(client._id)}
                              className="bg-red-500 flex items-center w-fit px-4 py-2 rounded-xl text-white uppercase text-sm cursor-pointer"
                            >
                              Delete
                              <FontAwesomeIcon
                                className="ml-2 mb-1"
                                icon={faTrashAlt}
                              />
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {numberOfPages > 1 && (
                <div class="flex my-2 items-center  justify-center space-x-2">
                  <button
                    className="bg-blue-500 text-sm hover:bg-blue-600 text-white px-2 py-1 rounded-lg"
                    onClick={gotoPrevious}
                  >
                    Previous
                  </button>

                  {pages.map((pageIndex) => (
                    <button
                      key={pageIndex}
                      className={`${pageNumber === pageIndex
                        ? "bg-blue-500 text-white"
                        : "bg-gray-300 hover:bg-gray-400 text-gray-800"
                        } px-3 py-1 rounded-lg`}
                      onClick={() => setPageNumber(pageIndex)}
                    >
                      {pageIndex + 1}
                    </button>
                  ))}

                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-sm text-white px-2 py-1 rounded-lg"
                    onClick={gotoNext}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
      {/* Toast container */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <AddNewUserModal
        isOpen={isOpen}
        onCancel={closeModal}

      />
    </div>
  );
}

export default Users;
