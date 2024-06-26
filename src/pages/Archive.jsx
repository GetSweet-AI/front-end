import React, { useEffect, useState } from "react";

import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import SearchForm from "../partials/SearchForm";
import FilterButton from "../components/DropdownFilter";
import BrandEngagementCard from "../partials/BrandEngagementCard";
import PaginationNumeric from "../partials/PaginationNumeric";

import Image01 from "../images/user-28-01.jpg";
import Image02 from "../images/user-28-02.jpg";
import DashboardHeader from "../partials/DashboardHeader";
import axios from "axios";
import { useSelector } from "react-redux";
import { MutatingDots } from "react-loader-spinner";

function Archive() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [engagements, setEngagements] = useState([]);
  const [templates, setTemplates] = useState([])

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const { token, user } = useSelector((state) => state.auth);

  //pagination
  const [pageNumber, setPageNumber] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);


  //creates an array called pages and initializes it with a sequence of numbers from 0 to numberOfPages - 1
  const pages = new Array(numberOfPages).fill(null).map((v, i) => i);

  //Fetch archive of brand engagements and templates
  const fetchEngagements = async () => {
    setIsLoading(true);
    try {
      fetch(`https://seal-app-dk3kg.ondigitalocean.app/api/v1/admin/archive?userId=${user?._id}&page=${pageNumber}`)
        .then((response) => response.json())
        .then(({ totalPages, archive }) => {
          setEngagements(archive);
          setNumberOfPages(totalPages);

        });
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://seal-app-dk3kg.ondigitalocean.app/api/v1/admin/archive?userId=${user?._id}&page=${pageNumber}`)
      .then((response) => response.json())
      .then(({ totalPages, archive }) => {
        setEngagements(archive);
        setNumberOfPages(totalPages);
      });
    setIsLoading(false);
  }, [pageNumber]);
  // Fetch data when the currentPage changes


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

  //Get ClientConnect by BrandEngagementId
  const [connectLinkURL, setConnectLinkURL] = useState("")
  const [isLoadingCC, setIsLoadingCC] = useState(false);


  //Get template + add delete icon

  const [loadingTemplates, setLoadingTemplates] = useState(false)
  const getTemplates = async () => {
    setLoadingTemplates(true)
    try {
      await axios.get(`https://seal-app-dk3kg.ondigitalocean.app/api/v1/admin/templates-archive?userId=${user?._id}`).then((res) => {
        setTemplates(res.data.templateArchive)
      })

    } catch (error) {

    }
    setLoadingTemplates(false)
  }

  useEffect(() => {
    getTemplates()
  }, [])


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
          header="Archive"
        />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Page header */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              {/* Left: Title */}
              <div className="mb-4 sm:mb-0 ">
                <h1 className="text-xl text-blue-500 font-bold">
                  Brand Engagements Archive
                </h1>

              </div>

              {/* Right: Actions */}
              <div className="">


              </div>
            </div>



            {/* Cards */}
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
            {engagements?.length > 0 && (
              <div className="">
                <div className="grid grid-cols-12 gap-6">
                  {engagements.
                    map((item) => {
                      return (
                        <BrandEngagementCard
                          key={item._id}
                          id={item._id}
                          brandName={item?.BrandName}
                          postContent={item?.postContent}
                          website={item.WebSite}
                          timeZone={item.Timezone}
                          companySector={item.CompanySector}
                          brandTone={item.BrandTone}
                          targetAudience={item.TargetAudience}
                          postType={item.PostType}
                          relatedPostsStatus={item.relatedPostsStatus}
                          fetchEngagements={fetchEngagements}
                          isArchive={true}

                        />
                      );
                    })}
                </div>
              </div>
            )}

            {/* Pagination */}
            {numberOfPages > 0 && <div className="mt-8">
              <div class="flex items-center md:mt-4 justify-center space-x-2">
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
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-300 hover:bg-gray-400 text-gray-800'
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
              {/* <PaginationNumeric /> */}</div>}


            {/* Page header */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              {/* Left: Title */}
              <div className="mb-4 sm:mb-0 ">
                <h1 className="text-2xl md:text-3xl text-blue-500 font-bold">
                  Templates Archive
                </h1>

              </div>

            </div>
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

                  </div>
                ))
              }</div>
          </div>



        </main>
      </div>
    </div>
  );
}

export default Archive;
