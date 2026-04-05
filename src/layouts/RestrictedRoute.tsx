import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import { userLoading, userRole } from "../../features/user/userSelector";

const RestrictedRoute = () => {
  const role = useSelector(userRole) as "candidate" | "employer";
  const loading = useSelector(userLoading);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (role) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default RestrictedRoute;
