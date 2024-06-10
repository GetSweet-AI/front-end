import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';

function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

function BrandEngagementWrapper({isLoggedIn}) {

    const query = useQuery();
    const isGuest = query.get('isGuest');

    if (isLoggedIn) {
        return <Navigate to="/brand-engagement-builder" replace />; // Redirect logged-in users to their dashboard
    }

    if (isGuest === 'true') {
        return <BrandEngagementDetails isGuest={isGuest} />;
    } else {
        return <Navigate to="/signin" replace />; // Redirect to sign-in if not a guest or not logged in
    }
}

export default BrandEngagementWrapper;
