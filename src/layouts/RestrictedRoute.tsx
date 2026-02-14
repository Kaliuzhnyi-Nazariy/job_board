import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import {
  // userInitialized,
  userLoading,
  userRole,
} from "../../features/user/userSelector";

const RestrictedRoute = () => {
  const role = useSelector(userRole) as "candidate" | "employer";
  const loading = useSelector(userLoading);
  // const initialized = useSelector(userInitialized);

  // console.log({ initialized, loading, role });

  //   if (!initialized || loading) {
  //     return <div>Loading...</div>;
  //   }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (role) {
    return <Navigate to="/" replace />;
  }

  // console.log("maybe");

  return <Outlet />;
};

export default RestrictedRoute;
