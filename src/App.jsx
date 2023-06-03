import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';
import 'aos/dist/aos.css';
import './css/style.css';
import AOS from 'aos';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import BrandEngagements from './pages/BrandEngagements';
import BrandEngagementBuilder from './pages/BrandEngagementBuilder';
import BrandEngagementCard from './pages/BrandEngagementCard';
import Profile from './pages/profile';
import { useSelector } from 'react-redux';

function App() {

  const location = useLocation();

  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 500,
      easing: 'ease-out-cubic',
    });
  });

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  const { isLoggedIn } = useSelector((state) => state.auth)

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        {/* <Route path="/workflows" element={<Dashboard />} /> */}
        <Route path="/brand-engagements" element={isLoggedIn ? <BrandEngagements /> : <SignIn />} />
        <Route path="/brand-engagement-builder" element={isLoggedIn ? <BrandEngagementBuilder /> : <SignIn />} />
        <Route path="/profile" element={isLoggedIn ? <Profile /> : <SignIn />} />
        <Route path="/workflows/:id" element={isLoggedIn ? <BrandEngagementCard /> : <SignIn />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
