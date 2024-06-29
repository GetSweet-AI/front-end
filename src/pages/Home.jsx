import React, { useEffect } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import logo from "../images/logogetsweet.png";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { Helmet } from "react-helmet";
import GAHandler from "../partials/ga_gtm_handler";
const handleLinkClick = GAHandler();

// import the library
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import specific icons
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";
import { Dialog } from "@headlessui/react";
import {
  ArrowPathIcon,
  Bars3Icon,
  CloudArrowUpIcon,
  FingerPrintIcon,
  LockClosedIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { CheckIcon, PlusIcon } from "@heroicons/react/20/solid";
import { useSelector } from "react-redux";
import Onboarding from "../components/OnBoarding/Onboarding";
import WhyUseOurProduct from "../components/whyUseProducts";
import WhatItWorksWith from "../components/whatWorksWith";

const navigation = [
  { name: 'Sign up', href: '/signup', gtmtrigger: 'header_create_account_btn' },
  { name: 'Sign in', href: '/signin', gtmtrigger: 'header_sign_in_btn' },
]
const features = [
  {
    name: "Push to deploy",
    description:
      "Morbi viverra dui mi arcu sed. Tellus semper adipiscing suspendisse semper morbi. Odio urna massa nunc massa.",
    icon: CloudArrowUpIcon,
  },
  {
    name: "SSL certificates",
    description:
      "Sit quis amet rutrum tellus ullamcorper ultricies libero dolor eget. Sem sodales gravida quam turpis enim lacus amet.",
    icon: LockClosedIcon,
  },
  {
    name: "Simple queues",
    description:
      "Quisque est vel vulputate cursus. Risus proin diam nunc commodo. Lobortis auctor congue commodo diam neque.",
    icon: ArrowPathIcon,
  },
  {
    name: "Advanced security",
    description:
      "Arcu egestas dolor vel iaculis in ipsum mauris. Tincidunt mattis aliquet hac quis. Id hac maecenas ac donec pharetra eget.",
    icon: FingerPrintIcon,
  },
];
const tiers = [
  {
    name: "Freelancer",
    id: "tier-freelancer",
    href: "#",
    priceMonthly: "$24",
    description: "The essentials to provide your best work for clients.",
    features: [
      "5 products",
      "Up to 1,000 subscribers",
      "Basic analytics",
      "48-hour support response time",
    ],
    mostPopular: false,
  },
  {
    name: "Startup",
    id: "tier-startup",
    href: "#",
    priceMonthly: "$32",
    description: "A plan that scales with your rapidly growing business.",
    features: [
      "25 products",
      "Up to 10,000 subscribers",
      "Advanced analytics",
      "24-hour support response time",
      "Marketing automations",
    ],
    mostPopular: true,
  },
  {
    name: "Enterprise",
    id: "tier-enterprise",
    href: "#",
    priceMonthly: "$48",
    description: "Dedicated support and infrastructure for your company.",
    features: [
      "Unlimited products",
      "Unlimited subscribers",
      "Advanced analytics",
      "1-hour, dedicated support response time",
      "Marketing automations",
    ],
    mostPopular: false,
  },
];
const faqs = [
  {
    id: 1,
    question: "What's the best thing about Switzerland?",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
  // More questions...
];
const footerNavigation = {
  socials: [
    { name: "Facebook", href: "#" },
    { name: "Data Services", href: "#" },
    { name: "Uptime Monitoring", href: "#" },
    { name: "Enterprise Services", href: "#" },
  ],
  support: [
    { name: "Pricing", href: "#" },
    { name: "Documentation", href: "#" },
    { name: "Guides", href: "#" },
    { name: "API Reference", href: "#" },
  ],
  company: [
    { name: "About", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Jobs", href: "#" },
    { name: "Press", href: "#" },
    { name: "Partners", href: "#" },
  ],
  legal: [
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
  ],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}



export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth)
  console.log("isLoggedIn :" + isLoggedIn)


  const navigate = useNavigate()

  useEffect(() => {
    isLoggedIn && navigate('/posts-feed')
  }, [])


  // const [planInfos, setPlansInfo] = useState()
  // const [isLoading, setIsLoading] = useState(false)
  // const getPlanInfos = async () => {
  //   //   setIsPlansLoading(true)
  //   setIsLoading(true)
  //   await axios.get(`https://seal-app-dk3kg.ondigitalocean.app/api/v1/plans`)
  //     .then((res) => {
  //       setPlanInfos(res?.data.planInfos)

  //     })
  //   //   setIsPlansLoading(false)
  //   setIsLoading(false)
  // }

  // useEffect(() => {
  //   getPlanInfos()
  // }, [])

  const handleClick = () => {
    navigate('/signin')
  }


  return (
    <div className="bg-white#">
      {/* embed videos script */}
      <Helmet>
        <script
          src="https://static.elfsight.com/platform/platform.js"
          defer
        ></script>
      </Helmet>
      <div class="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div class="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div></div>
      {/* Header */}
      <Header/>
      
      
     
   
      

      <main className="isolate">
        {/* Hero section */}
        <div className="relative pt-12">
          <div
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
          <div className="py-8 sm:py-16">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-3xl text-center">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  100% Automate your{" "}
                  <span className="text-pink-600">social media</span> with AI

                  {/* Fully automate your business’s <span className="text-pink-600"> social media posts!</span> */}
                </h1>
                <p className="mt-4 text-md leading-8 text-gray-600">
                  Ditch ChatGPT and all the other tools your business might use and get on board with Sweet.AI; the revolutionary social media that will fully automate your posts seamlessly!
                </p>
                <div className="mt-6 flex items-center justify-center gap-x-6">
                  <Link to="/signup"
                    // GA code
                    onClick={() => handleLinkClick("home_get_started_btn")}
                    href="/signup"
                    className="rounded-md bg-indigo-600 px-12 py-2.5 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Get started for free
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div
            id="elfsight-app"
            className="elfsight-app-ae14bbe7-ba3e-4362-b034-71b263e84eba"
          ></div>
          <div>
          <WhyUseOurProduct/>
          <WhatItWorksWith/>
          </div>
        </div>
      </main>


      <Footer />
    </div>
  );
}
