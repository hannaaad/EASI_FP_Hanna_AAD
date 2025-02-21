// ProtectedRoute.tsx
import {Navigate, Outlet} from "react-router-dom";
import {useUser} from "./UserService.tsx";

interface ProtectedRouteProps {
    isAdminRequired?: boolean;
    redirectPath?: string;
}

const ProtectedRoute = ({ isAdminRequired = false, redirectPath = "/login" }: ProtectedRouteProps) => {
    const {user} = useUser();

    // If no user is logged in, redirect to the login page
    if (!user) {
        return <Navigate to={redirectPath} replace />;
    }

    // If the route requires admin access and the user is not an admin, redirect to the user page
    if (isAdminRequired && !user.isAdmin) {
        return <Navigate to="/user" replace />;
    }

    // If the user is allowed to access the route, render the children
    return <Outlet />;
};

export default ProtectedRoute;