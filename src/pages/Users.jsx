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
import { faArrowsRotate, faL } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { targetAudienceOptions } from "../constants/objects";
import brandTones from "../constants/brandTones";
import postTypeOptions from "../constants/postTypeOtions";
import { clearMessage, setMessage } from "../redux/message";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Users() {
  const dispatch = useDispatch();

  const [previewLoading, setPreviewLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [engagements, setEngagements] = useState([]);
  const [result, setResult] = useState(null);
  const { token, user } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const [values, setValues] = useState({
    brandName: "",
    websiteUrl: "",
    timeZone: null,
    companySector: null,
    brandTone: null,
    targetAudience: null,
    postType: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSelectChange = (name, selectedOption) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: selectedOption,
    }));
  };

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [users, setUsers] = useState([]);
  const fetchUsers = async () => {
    await axios
      .get(
        `https://seashell-app-8amlb.ondigitalocean.app/api/v1/admin/users?userId=${user?._id}`
      )
      .then((res) => {
        setUsers(res.data);
        console.log("res?.data :" + JSON.stringify(res?.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const updateRole = (userId) => {
    axios
      .put(
        `https://seashell-app-8amlb.ondigitalocean.app/api/v1/admin/users/${userId}/update-role`
      )
      .then((res) => {
        fetchUsers();
      })
      .catch((err) => {
        console.log(err);
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
                    <tr className="bg-blue-500 text-white">
                      <th className="py-3 px-6 text-left rounded-tl-lg">
                        Name
                      </th>
                      <th className="py-3 px-6 text-left">Email</th>
                      <th className="py-3 px-6 text-left">Company</th>
                      <th className="py-3 px-6 text-left rounded-tr-lg">
                        Role
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <tr
                        key={user.id}
                        className={
                          index % 2 === 0
                            ? "bg-white"
                            : "bg-blue-100 rounded-full"
                        }
                      >
                        <td className="py-4 px-6 border-b">{user.fullName}</td>
                        <td className="py-4 px-6 border-b">{user.email}</td>
                        <td className="py-4 px-6 border-b">{user.company}</td>
                        <td className="py-4 px-6 border-b">
                          <span
                            onClick={() => updateRole(user._id)}
                            className="bg-blue-500 flex items-center w-fit px-4 py-2 rounded-xl text-white uppercase text-sm cursor-pointer"
                          >
                            {user.role}{" "}
                            <FontAwesomeIcon
                              className="ml-2"
                              icon={faArrowsRotate}
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
    </div>
  );
}

export default Users;
