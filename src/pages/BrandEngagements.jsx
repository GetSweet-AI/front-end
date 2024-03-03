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

function BrandEngagements() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [engagements, setEngagements] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const { token, user } = useSelector((state) => state.auth);



  //pagination
  const [pageNumber, setPageNumber] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);

  const pages = new Array(numberOfPages).fill(null).map((v, i) => i);

  const fetchEngagements = async () => {
    setIsLoading(true);
    try {
      fetch(`http://localhost:5000/api/v1/admin/brand-engagements?userId=${user?._id}&page=${pageNumber}`)
        .then((response) => response.json())
        .then(({ totalPages, brandEngagements }) => {
          setEngagements(brandEngagements);
          setNumberOfPages(totalPages);
        });
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:5000/api/v1/admin/brand-engagements?userId=${user?._id}&page=${pageNumber}`)
      .then((response) => response.json())
      .then(({ totalPages, brandEngagements }) => {
        setEngagements(brandEngagements);
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






  //Get ClientConnect by BrandEngagementId
  const [connectLinkURL, setConnectLinkURL] = useState("")
  const [isLoadingCC, setIsLoadingCC] = useState(false);



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
          header="Brand Engagements"
        />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Page header */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              {/* Left: Title */}
              <div className="mb-4 sm:mb-0  ">
                <h1 className="text-xl md:hidden  text-blue-500 font-bold">
                  Brand Engagements
                </h1>

              </div>

              {/* Right: Actions */}
              <div className="flex justify-center items-center">



                <div>
                  {numberOfPages > 0 && <div className="mr-4">
                    <div class="flex items-center justify-center space-x-2">
                      <button
                        className="bg-blue-500 text-sm hover:bg-blue-600 text-white px-2 py-1 rounded-lg"
                        onClick={gotoPrevious}
                      >
                        Previous
                      </button>

                      <select
                        value={pageNumber}
                        onChange={(e) => setPageNumber(parseInt(e.target.value))}
                        className="rounded-md h-9 block bg-white border border-gray-300 text-gray-600 "
                      >
                        {pages.map((pageIndex) => (
                          <option
                            key={pageIndex}
                            value={pageIndex}
                            className="text-black"
                          >
                            {pageIndex + 1}
                          </option>
                        ))}
                      </select>
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-sm text-white px-2 py-1 rounded-lg"
                        onClick={gotoNext}
                      >
                        Next
                      </button>
                    </div>
                    {/* <PaginationNumeric /> */}</div>}
                </div>

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
                  {engagements.map((item) => {
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
                        isArchive={false}
                        isAdminPage={true}

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


                <select
                  value={pageNumber}
                  onChange={(e) => setPageNumber(parseInt(e.target.value))}
                  className="rounded-md h-9 bg-white border border-gray-300 text-gray-600 "
                >
                  {pages.map((pageIndex) => (
                    <option
                      key={pageIndex}
                      value={pageIndex}
                      className="text-black"
                    >
                      {pageIndex + 1}
                    </option>
                  ))}
                </select>


                <button
                  className="bg-blue-500 hover:bg-blue-600 text-sm text-white px-2 py-1 rounded-lg"
                  onClick={gotoNext}
                >
                  Next
                </button>
              </div>
              {/* <PaginationNumeric /> */}</div>}

          </div>
        </main>
      </div>
    </div>
  );
}

export default BrandEngagements;
