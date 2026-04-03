import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import {
  // userInitialized,
  userLoading,
  userRole,
} from "../../features/user/userSelector";
// import { infoToast } from "../Components/Toasts/Toasts";
// import { useEffect } from "react";

const RestrictedRoute = () => {
  const role = useSelector(userRole) as "candidate" | "employer";
  const loading = useSelector(userLoading);
  // const initialized = useSelector(userInitialized);

  // console.log({ initialized, loading, role });

  //   if (!initialized || loading) {
  //     return <div>Loading...</div>;
  //   }

  // useEffect(() => {
  //   if (!loading && !role) {
  //     infoToast({ text: "You are logged in!" });
  //   }
  // }, [loading, role]);

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
