import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import {
  userInitialized,
  userLoading,
  userRole,
} from "../../features/user/userSelector";

const CandidateRoute = () => {
  const role = useSelector(userRole);

  const loading = useSelector(userLoading);
  const initialized = useSelector(userInitialized);

  if (!initialized || loading) {
    return <div className="">Loading...</div>;
  }

  if (role !== "employer") {
    return <Navigate to="/forbidden" />;
  }

  return <Outlet />;
};

export default CandidateRoute;
