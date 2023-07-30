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
import { faArrowsRotate, faL, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { targetAudienceOptions } from "../constants/objects";
import brandTones from "../constants/brandTones";
import postTypeOptions from "../constants/postTypeOtions";
import { clearMessage, setMessage } from "../redux/message";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MutatingDots } from "react-loader-spinner";

function Users() {
  const dispatch = useDispatch();

  const [deleteLoading, setDeleteLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [engagements, setEngagements] = useState([]);
  const [result, setResult] = useState(null);
  const { token, user } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const [isLoading, setIsLoading] = useState(false)
  // const [values, setValues] = useState({
  //   brandName: "",
  //   websiteUrl: "",
  //   timeZone: null,
  //   companySector: null,
  //   brandTone: null,
  //   targetAudience: null,
  //   postType: "",
  // });

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setValues((prevValues) => ({
  //     ...prevValues,
  //     [name]: value,
  //   }));
  // };

  // const handleSelectChange = (name, selectedOption) => {
  //   setValues((prevValues) => ({
  //     ...prevValues,
  //     [name]: selectedOption,
  //   }));
  // };

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    setIsLoading(true)
    await axios
      .get(
        `http://localhost:5000/api/v1/admin/users?userId=${user?._id}`
      )
      .then((res) => {
        setUsers(res.data);
        console.log("res?.data :" + JSON.stringify(res?.data));
      })
      .catch((err) => {
        console.log(err);
      });
    setIsLoading(false)
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateRole = (userId) => {
    axios
      .put(
        `http://localhost:5000/api/v1/admin/users/${userId}/update-role`
      )
      .then((res) => {
        fetchUsers();
        toast.success('User role updated');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteUser = (userId) => {
    axios
      .delete(
        `http://localhost:5000/api/v1/auth/users/${userId}`
      )
      .then((res) => {
        fetchUsers();
        toast.success('User deleted successfully');
      })
      .catch((err) => {
        console.log(err);
        toast.error(error);
      });
  };

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
          {isLoading && <div className="z-50 absolute top-[50%] left-[50%] -translate-x-[50%]">
            <MutatingDots
              height="100"
              width="100"
              color="#1c7aed"
              secondaryColor='#3078fd'
              radius='12.5'
              ariaLabel="mutating-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>}
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Page header */}
            <div className="h-screen mb-8">
              {/* Left: Title */}
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-blue-500 font-bold">
                  Users
                </h1>
              </div>
              <div className="w-full h-[700px] mt-10 overflow-x-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-blue-300 overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-purple-500 text-white">
                      <th className="py-3 px-6 text-left rounded-tl-lg">
                        Name
                      </th>
                      <th className="py-3 px-6 text-left">Email</th>
                      <th className="py-3 px-6 text-left">Company</th>
                      <th className="py-3 px-6 text-left ">
                        Role
                      </th>
                      <th className="py-3 px-6 text-left rounded-tr-lg">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.filter((client) => (client._id !== user?._id) && client?.isEmailConfirmed === true).map((client, index) => (
                      <tr
                        key={client._id}
                        className={
                          index % 2 === 0
                            ? "bg-white"
                            : "bg-blue-100 rounded-full"
                        }
                      >
                        <td className="py-4 px-6 border-b">{client.fullName}</td>
                        <td className="py-4 px-6 border-b">{client.email}</td>
                        <td className="py-4 px-6 border-b">{client.company}</td>
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
    </div>
  );
}

export default Users;
