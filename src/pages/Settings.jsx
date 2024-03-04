import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DashboardHeader from "../partials/DashboardHeader";
import Sidebar from "../partials/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { Puff } from "react-loader-spinner";
import { clearMessage, setMessage } from "../redux/message";
// import Sidebar from "../partials/Sidebar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import brandTones from "../constants/brandTones";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArchive, faBlog, faClose, faCog, faUsers } from "@fortawesome/free-solid-svg-icons";
import SwitchButton from "../partials/SwitchButton";
import { Tabs, Box, Text } from '@radix-ui/themes';
import TheProfile from './TheProfile'

function Settings() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [values, setValues] = useState({
        Title: "",
        brandName: "",
        websiteUrl: "",
        timeZone: null,
        companySector: null,
        brandTone: null,
        targetAudience: null,
        postType: "",
        other: "",
    });


    const [selectedOption, setSelectedOption] = useState('RunForEver');

    // Create a new Date object for the current date
    const currentDate = new Date();

    // Format the date to yyyy-mm-dd
    const formattedTodayDate = currentDate.toISOString().split('T')[0];
    const [endDate, setEndDate] = useState(''); // Initialize endDate state
    const [startDate, setStartDate] = useState(formattedTodayDate); // Initialize endDate state

    const { message } = useSelector((state) => state.message);
    const { user } = useSelector((state) => state.auth);

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



    const newTemplate = {
        Title: values?.Title,
        CompanySector: values.companySector,
        BrandTone: values.brandTone?.value,
        TargetAudience: values.targetAudience?.value,
        endDate: endDate,
        startDate: selectedOption === "HasEndDate" ? startDate : "",
        lifeCycleStatus: selectedOption
    };

    console.log("newTemplate :" + JSON.stringify(newTemplate))


    const dispatch = useDispatch()


    const [isLoading, setIsLoading] = useState(false)

    const addNewTemplate = async (e) => {
        e.preventDefault();


        setIsLoading(true)
        await axios
            .post(
                `https://seal-app-dk3kg.ondigitalocean.app/api/v1/admin/add-template/${user?._id}`,
                newTemplate
            )
            .then((res) => {
                handleReset()
                getTemplates()
                setEndDate('')
                setStartDate('')

            })
            .catch((err) => {

            });
        setIsLoading(false)


        // alert(JSON.stringify(postData))
    };


    // console.log(JSON.stringify(values))

    const handleReset = () => {
        setValues({
            Title: "",
            brandName: "",
            websiteUrl: "",
            timeZone: null,
            companySector: "",
            brandTone: null,
            targetAudience: null,
        });
        dispatch(clearMessage());

    };


    //Get template + add delete icon
    const [templates, setTemplates] = useState([])
    const getTemplates = async () => {
        try {
            await axios.get(`https://seal-app-dk3kg.ondigitalocean.app/api/v1/admin/templates?userId=${user?._id}`).then((res) => {
                setTemplates(res.data.templates)
            })

        } catch (error) {

        }
    }

    useEffect(() => {
        getTemplates()
    }, [])


    const deleteTemplate = async (id) => {
        try {
            await axios.delete(`https://seal-app-dk3kg.ondigitalocean.app/api/v1/admin/templates/${user._id}?temId=${id}`).then((res) => {
                getTemplates()
            })

        } catch (error) {

        }
    }



    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };
    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };

    const [enabled, setEnabled] = useState(false);
    useEffect(() => {
        if (enabled) {
            //Show endDate field
            setSelectedOption("HasEndDate")
        } else {
            setSelectedOption("RunForEver")
            setEndDate("")
        }
    }, [enabled])


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
                    header="Settings"
                />

                <main>
                    <div className="px-4 bg-blue-50 sm:px-6 lg:px-8 py-4 w-full max-w-9xl mx-auto">
                        {/* Page header */}


                        <div className="sm:flex sm:justify-between sm:items-center mb-8">
                            <div className="mb-4 sm:mb-0">
                                <h1 className="text-xl md:hidden text-blue-500 font-bold">
                                    Settings
                                </h1>
                            </div>
                        </div>
                        <div className='flex flex-col justify-center'>

                        </div>

                        <Tabs.Root defaultValue="account">
                            <Tabs.List>
                                <Tabs.Trigger value="account">Account</Tabs.Trigger>
                                <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
                                <Tabs.Trigger value="manageBilling">Manage Billing</Tabs.Trigger>
                            </Tabs.List>

                            <Box px="4" pt="3" pb="2">
                                <Tabs.Content value="account">
                                    <Text size="2">Make changes to your account.</Text>
                                    <TheProfile />
                                </Tabs.Content>

                                <Tabs.Content value="settings">
                                    <Text size="2"> Add New Template</Text>


                                    <div className="max-w-8xl my-2 bg-blue-50 pb-2
                                         md:mx-auto  md:px-6 ">


                                        <form className="rounded-xl shadow-md  md:py-4 md:px-4  "
                                            onSubmit={addNewTemplate}>
                                            <div className="flex flex-wrap">
                                                {/* <div className="w-full p-3">
                                                            <h2 className="font-medium md:w-1/2 text-blue-600 p-2 rounded-md  text-md  md:text-2xl mb-2">
                                                                Add New Template
                                                            </h2>
                                                        </div> */}
                                                <div className="w-full md:w-1/2 p-2">
                                                    <label htmlFor="input1" className="block mb-1">
                                                        Template Title
                                                    </label>
                                                    <input
                                                        className="w-full border-gray-300 rounded p-2"
                                                        type="text"
                                                        name="Title"
                                                        placeholder="Brand Name"
                                                        value={values.Title}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>

                                                <div className="w-full md:w-1/2 p-2">
                                                    <label htmlFor="select2" className="block mb-1">
                                                        Brand Description
                                                    </label>
                                                    {/* Brand Description Text Box */}
                                                    <textarea
                                                        // id="input1"
                                                        className="w-full border-gray-300 rounded p-2"
                                                        type="text"
                                                        rows={2}
                                                        maxLength={300}
                                                        name="companySector"
                                                        placeholder="Enter your brand description "
                                                        value={values.companySector}
                                                        onChange={handleInputChange}
                                                    />

                                                </div>

                                                <div className="w-full md:w-1/2 p-2">
                                                    <label htmlFor="select3" className="block mb-1">
                                                        Brand Tone
                                                    </label>
                                                    <Select
                                                        id="select3"
                                                        className="w-full"
                                                        placeholder="Brand Tone"
                                                        name="brandTone"
                                                        value={values.brandTone}
                                                        onChange={(selectedOption) =>
                                                            handleSelectChange("brandTone", selectedOption)
                                                        }
                                                        options={brandTones}
                                                    />
                                                </div>
                                                <div className="w-full mt-3 md:w-1/2 p-2">
                                                    <div className=" mt-2 flex w-full justify-center items-center p-2">
                                                        <label className={`mr-4 ${selectedOption === 'RunForEver' ? 'text-[#3b82f6]' : 'text-gray-700'}`}>
                                                            <span className="mr-2 text-md  font-medium">Run forever</span>
                                                        </label>

                                                        <SwitchButton enabled={enabled} setEnabled={setEnabled} />

                                                        <label className={`ml-4 ${selectedOption === 'HasEndDate' ? 'text-[#3b82f6]' : 'text-gray-700'}`}>
                                                            <span className="ml-2 text-md  font-medium">Add date range</span>
                                                        </label>
                                                    </div>
                                                </div>

                                                <div className="w-full md:w-1/2 p-2">
                                                    {selectedOption === 'HasEndDate' && (
                                                        <div>
                                                            <label className="block text-md  ">
                                                                Start Date
                                                            </label>
                                                            <input
                                                                type="date"
                                                                className="mt-1 p-2 border border-gray-300 rounded w-full focus:ring-indigo-500 focus:border-indigo-500"
                                                                value={startDate} // Bind the input value to endDate state
                                                                onChange={handleStartDateChange} // Update the endDate state
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="w-full md:w-1/2 p-2">
                                                    {selectedOption === 'HasEndDate' && (
                                                        <div>
                                                            <label className="block text-md  ">
                                                                End Date
                                                            </label>
                                                            <input
                                                                type="date"
                                                                className="mt-1 p-2 border border-gray-300 rounded w-full focus:ring-indigo-500 focus:border-indigo-500"
                                                                value={endDate} // Bind the input value to endDate state
                                                                onChange={handleEndDateChange} // Update the endDate state
                                                            />
                                                        </div>
                                                    )}
                                                </div>


                                                <div className="flex w-full justify-center items-center">
                                                    <p className="text-red-500 text-sm my-2  text-center">
                                                        {message ? message : ""}
                                                    </p>
                                                </div>
                                                <div className="md:flex w-full p-2">
                                                    <button
                                                        type="reset"
                                                        onClick={handleReset}
                                                        className="md:w-[40%] w-full bg-[#60696d] text-white rounded p-2"
                                                    >
                                                        Reset form
                                                    </button>
                                                    <button

                                                        className="md:w-[80%] flex justify-center items-center w-full bg-purple-500 text-white rounded p-2 mt-2 md:mt-0 md:ml-2"
                                                    >
                                                        Add
                                                    </button>
                                                </div>

                                            </div>
                                        </form>
                                        {isLoading && (
                                            <div className="z-50 absolute top-[50%] left-[50%] -translate-x-[50%]">
                                                {" "}
                                                <Puff
                                                    height="100"
                                                    width="100"
                                                    color="#4446e4"
                                                    secondaryColor="#4446e4"
                                                    radius="12.5"
                                                    ariaLabel="mutating-dots-loading"
                                                    wrapperStyle={{}}
                                                    wrapperClass=""
                                                    visible={true}
                                                />
                                            </div>
                                        )}





                                        <div>
                                            <div className="mt-2 flex-">


                                                <div className="flex flex-wrap">
                                                    {
                                                        templates?.map((template, idx) => (
                                                            <div
                                                                key={idx}
                                                                className="flex border-2 text-sm m-1 text-md 
                            border-blue-600 py-1 px-2 rounded-xl"
                                                            // onClick={ }
                                                            >
                                                                <button className="">
                                                                    {template.Title}
                                                                </button>
                                                                <button
                                                                    onClick={() => deleteTemplate(template._id)}
                                                                    className="hover:bg-blue-200 rounded-full py-2 ml-1 flex justify-center items-center">

                                                                    <FontAwesomeIcon className="text-red-500 text-center mx-3 h-4 " icon={faClose} />
                                                                </button>
                                                            </div>
                                                        ))
                                                    }</div>

                                            </div>

                                        </div>
                                    </div>
                                </Tabs.Content>

                                <Tabs.Content value="manageBilling">Hi</Tabs.Content>
                            </Box>
                        </Tabs.Root>

                        {/* Toast container */}

                    </div>
                </main>
            </div>
        </div>
    );
}

export default Settings;
