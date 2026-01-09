import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import {
  userInitialized,
  userLoading,
  userRole,
} from "../../features/user/userSelector";

const EmployerRoute = () => {
  const role = useSelector(userRole);

  const loading = useSelector(userLoading);
  const initialized = useSelector(userInitialized);

  if (!initialized || loading) {
    return <div>Loading...</div>;
  }

  if (role !== "employer") {
    return <Navigate to="/forbidden" />;
  }

  return <Outlet />;
};

export default EmployerRoute;
