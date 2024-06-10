import React, { useEffect, lazy, Suspense, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "aos/dist/aos.css";
import "./css/style.css";
import AOS from "aos";
import { useSelector } from "react-redux";
import { Puff, ThreeDots } from "react-loader-spinner";
import Archive from "./pages/Archive";
import Settings from "./pages/Settings";
import Assets from "./pages/Assets";
import axios from 'axios'
import PaymentFailed from "./pages/PaymentFailed";
import TrialExpiredModal from "./components/Payment/TrialExpiredModal";

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
const PreviewPage = lazy(() => import("./pages/PreviewPage"));

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

  const [isTrialExpired, setIsTrialExpired] = useState(false);
  const hideModalPaths = ["/payment", "/preview", "/"];


  useEffect(() => {
    const checkFreeTrialStatus = async () => {
      if (isLoggedIn) {
        try {
          const response = await axios.get(`https://seal-app-dk3kg.ondigitalocean.app/api/v1/auth/check-free-trial/${user?._id}`);
          const data = response.data;

          if (!data?.user.isTrialActive && data?.user.Plan === "Free") {
            setIsTrialExpired(true);
          }
        } catch (error) {
          console.error('Error checking free trial status:', error);
        }
      }
    };

    checkFreeTrialStatus();
  }, [user]);

  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen"><ThreeDots
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

      {isTrialExpired && !hideModalPaths.includes(location.pathname) && (
        <TrialExpiredModal isVisible={true} onClose={() => setIsTrialExpired(false)} />
      )}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/brand-engagements" element={isLoggedIn ? <BrandEngagements /> : <SignIn />} />
        <Route path="/archive" element={isLoggedIn ? <Archive /> : <SignIn />} />
        <Route path="/brand-engagement-builder" element={isLoggedIn ? <BrandEngagementBuilder /> : <SignIn />} />
        <Route path="/profile" element={isLoggedIn ? <TheProfile /> : <SignIn />} />
        <Route path="/assets" element={isLoggedIn ? <Assets /> : <SignIn />} />
        <Route path="/payment" element={isLoggedIn ? <Payment /> : <SignIn />} />
        <Route path="/payment/manage-subscription" element={isLoggedIn ? <ManageSubscription /> : <SignIn />} />
        <Route path="/success" element={isLoggedIn ? <Success /> : <SignIn />} />
        <Route path="/brand-engagements/:id" element={<BrandEngagementDetails />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/send-email" element={<SendEmail />} />
        <Route path="/posts-feed" element={<PostsFeed />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/check-email" element={<CheckEmail />} />
        <Route path="/payment-failed" element={<PaymentFailed />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/confirm-email/:userId" element={<EmailConfirmed />} />
        <Route path="/preview" element={<PreviewPage />} />
        <Route path="*" element={<NotFound />} />
        {user?.role === "admin" && <Route path="/users" element={<Users />} />}
      </Routes>
    </Suspense>
  );
}

export default App;
