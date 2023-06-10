import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element, isLoggedIn, redirectTo }) => {
    return isLoggedIn ? <Element /> : <Navigate to={redirectTo} replace />;
};

export default PrivateRoute;
