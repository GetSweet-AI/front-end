import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "aos/dist/aos.css";
import "./css/style.css";
import AOS from "aos";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import BrandEngagements from "./pages/BrandEngagements";
import BrandEngagementBuilder from "./pages/BrandEngagementBuilder";
import BrandEngagementCard from "./pages/BrandEngagementCard";
import Profile from "./pages/profile";
import { useSelector } from "react-redux";
import ResetPassword from "./pages/ResetPassword";
import VerifyEmail from "./pages/VerifyEmail";
import SendEmail from "./pages/SendEmail";
import Users from "./pages/Users";
import NotFound from "./pages/NotFound";
import EmailConfirmed from "./pages/EmailConfirmed";
import CheckEmail from "./pages/CheckEmail";
import PostsFeed from "./pages/PostsFeed";
import Payment from "./pages/Payment";
import Success from "./pages/Success";
import ManageSubscription from "./pages/ManageSubscriprion";
import PrivacyPolicy from "./pages/privacy-policy";
import TermsOfService from "./pages/terms-of-service";
import BrandEngagementDetails from "./pages/BrandEngagementDetails";

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
  // console.log(user);

  // Check if the referrer starts with "https://checkout.stripe.com/"

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        {/* <Route path="/workflows" element={<Dashboard />} /> */}
        <Route
          path="/brand-engagements"
          element={isLoggedIn ? <BrandEngagements /> : <SignIn />}
        />
        <Route
          path="/brand-engagement-builder"
          element={isLoggedIn ? <BrandEngagementBuilder /> : <SignIn />}
        />
        <Route
          path="/profile"
          element={isLoggedIn ? <Profile /> : <SignIn />}
        />
        <Route
          path="/payment"
          element={isLoggedIn ? <Payment /> : <SignIn />}
        />
        <Route
          path="/payment/manage-subscription"
          element={isLoggedIn ? <ManageSubscription /> : <SignIn />}
        />

        <Route
          path="/success"
          element={isLoggedIn ? <Success /> : <SignIn />}
        />

        <Route
          path="/brand-engagements/:id"
          element={isLoggedIn ? <BrandEngagementDetails /> : <SignIn />}
        />
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
    </>
  );
}

export default App;
