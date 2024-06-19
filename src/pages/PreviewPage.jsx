import React, { useEffect, useState } from "react";
import BrandEngagementCard from '../partials/BrandEngagementCard';
import { Dialog } from "@headlessui/react";

import Footer from "../partials/Footer";

import logo from "../images/logogetsweet.png";
import {
    ArrowPathIcon,
    Bars3Icon,
    CloudArrowUpIcon,
    FingerPrintIcon,
    LockClosedIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";

const navigation = [
    { name: 'Sign up', href: '/signup', gtmtrigger: 'header_create_account_btn' },
    { name: 'Sign in', href: '/signin', gtmtrigger: 'header_sign_in_btn' },
]

export default function PreviewPage() {

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const [engagements, setEngagements] = useState([])
    const fetchEngagements = async () => {
        await fetch(
            `https://seal-app-dk3kg.ondigitalocean.app/api/v1/brand-engagements-ex`
        )
            .then((response) => response.json())
            .then(({ totalPages, brandEngagements }) => {
                setEngagements(brandEngagements);
            });
    };

    useEffect(() => {
        fetchEngagements()
    }, [])

    return (
        <div>
            <header className="absolute inset-x-0 top-0 z-50">
                <nav
                    className="flex items-center justify-between p-6 lg:px-8"
                    aria-label="Global"
                >
                    <div className="flex lg:flex-1">
                        <a href="/" className="flex items-center -m-1.5 p-1.5">
                            <img
                                className="h-10 w-auto mr-2"  // <-- Moved the comment out of the JSX attribute area
                                src={logo}
                                alt="GetSweet.AI logo icon"
                            />
                            {/* Added 'mr-2' for some spacing between the logo and the text */}
                            <span className="font-bold text-xl text-gray-900">
                                GetSweet.AI
                            </span>
                        </a>
                    </div>
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="hidden lg:flex lg:gap-x-12">
                        {navigation.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="text-sm font-semibold leading-6 text-gray-900"
                                // GA code
                                onClick={(e) => {
                                    handleLinkClick(item.gtmtrigger);
                                }}

                            >
                                {item.name}
                            </a>
                        ))}

                    </div>
                </nav>
                <Dialog
                    as="div"
                    className="lg:hidden"
                    open={mobileMenuOpen}
                    onClose={setMobileMenuOpen}
                >
                    <div className="fixed inset-0 z-50" />
                    <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex items-center justify-between">
                            <a href="#" className="-m-1.5 p-1.5">
                                <span className="sr-only">GetSweet.AI</span>
                                <img className="h-8 w-auto" src={logo} alt="" />
                            </a>
                            <button
                                type="button"
                                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                        <div className="mt-6 flow-root">

                            <div className="space-y-2 py-6">

                                <a
                                    href='/signin'
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold
                       leading-7 text-gray-900 hover:bg-pink-400"

                                >
                                    Sign In
                                </a>
                                <a
                                    href='/signup'
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold
                       leading-7 text-gray-900 hover:bg-pink-400"

                                >
                                    Sign Up
                                </a>

                            </div>

                        </div>
                    </Dialog.Panel>
                </Dialog>
            </header>
            <div class="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div class="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div></div>
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full pt-28 max-w-8xl mx-auto">
                <div className="grid grid-cols-12 gap-6">
                    {engagements.map((item) => {
                        return (
                            <BrandEngagementCard
                                key={item._id}
                                id={item._id}
                                brandName={item?.BrandName}
                                websiteUrl={item.WebSite}
                                timeZone={item.Timezone}
                                companySector={item.CompanySector}
                                brandTone={item.BrandTone}
                                targetAudience={item.TargetAudience}
                                postType={item.PostType}
                                postContent={item.postContent}
                                relatedPostsStatus={item.relatedPostsStatus}
                                fetchEngagements={fetchEngagements}
                                isAdminPage={false}
                                campaignTitle={item?.campaignTitle}
                                endDate={item?.endDate}
                                lifeCycleStatus={item?.lifeCycleStatus}
                                isViewOnly={true}
                            />
                        );
                    })}
                </div>
            </div>

            <Footer />
        </div>
    )
}
