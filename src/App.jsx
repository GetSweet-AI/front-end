import React, { useEffect, lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "aos/dist/aos.css";
import "./css/style.css";
import AOS from "aos";
import { useSelector } from "react-redux";
import { Puff } from "react-loader-spinner";
import Archive from "./pages/Archive";

const Home = lazy(() => import("./pages/Home"));
const SignIn = lazy(() => import("./pages/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const BrandEngagements = lazy(() => import("./pages/BrandEngagements"));
const BrandEngagementBuilder = lazy(() => import("./pages/BrandEngagementBuilder"));
const TheProfile = lazy(() => import("./pages/TheProfile"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const VerifyEmail = lazy(() => import("./pages/VerifyEmail"));
const SendEmail = lazy(() => import("./pages/SendEmail"));
const Users = lazy(() => import("./pages/Users"));
const NotFound = lazy(() => import("./pages/NotFound"));
const EmailConfirmed = lazy(() => import("./pages/EmailConfirmed"));
const CheckEmail = lazy(() => import("./pages/CheckEmail"));
const PostsFeed = lazy(() => import("./pages/PostsFeed"));
const Payment = lazy(() => import("./pages/Payment"));
const Success = lazy(() => import("./pages/Success"));
const ManageSubscription = lazy(() => import("./pages/ManageSubscriprion"));
const PrivacyPolicy = lazy(() => import("./pages/privacy-policy"));
const TermsOfService = lazy(() => import("./pages/terms-of-service"));
const BrandEngagementDetails = lazy(() => import("./pages/BrandEngagementDetails"));

function App() {
  const location = useLocation();

  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 500,
      easing: "ease-out-cubic",
    });
  });

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  const { isLoggedIn, user } = useSelector((state) => state.auth);

  return (
    <Suspense fallback={<div className="z-50 absolute top-[50%] left-[50%] -translate-x-[50%]"><Puff
      height="100"
      width="100"
      color="#4446e4"
      secondaryColor="#4446e4"
      radius="12.5"
      ariaLabel="mutating-dots-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    /></div>}>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/brand-engagements" element={isLoggedIn ? <BrandEngagements /> : <SignIn />} />
        <Route path="/archive" element={isLoggedIn ? <Archive /> : <SignIn />} />
        <Route path="/brand-engagement-builder" element={isLoggedIn ? <BrandEngagementBuilder /> : <SignIn />} />
        <Route path="/profile" element={isLoggedIn ? <TheProfile /> : <SignIn />} />
        <Route path="/payment" element={isLoggedIn ? <Payment /> : <SignIn />} />
        <Route path="/payment/manage-subscription" element={isLoggedIn ? <ManageSubscription /> : <SignIn />} />
        <Route path="/success" element={isLoggedIn ? <Success /> : <SignIn />} />
        <Route path="/brand-engagements/:id" element={isLoggedIn ? <BrandEngagementDetails /> : <SignIn />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/send-email" element={<SendEmail />} />
        <Route path="/posts-feed" element={<PostsFeed />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/check-email" element={<CheckEmail />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/confirm-email/:userId" element={<EmailConfirmed />} />
        <Route path="*" element={<NotFound />} />
        {user?.role === "admin" && <Route path="/users" element={<Users />} />}
      </Routes>
    </Suspense>
  );
}

export default App;
