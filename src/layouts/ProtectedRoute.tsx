import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import {
  userInitialized,
  userLoading,
  userRole,
} from "../../features/user/userSelector";
// import { infoToast } from "../Components/Toasts/Toasts";
// import { useEffect } from "react";

type ProtectedRouteProps = {
  allowedRoles?: ("candidate" | "employer")[];
};

const PrtoectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const role = useSelector(userRole) as "candidate" | "employer";
  const loading = useSelector(userLoading);
  const initialized = useSelector(userInitialized);

  // console.log({ role, initialized, loading });

  // useEffect(() => {
  //   if (initialized && !loading && !role) {
  //     infoToast({ text: "User unauthorized!" });
  //   }
  // }, [initialized, loading, role]);

  if (!initialized || loading) {
    return <div>Loading...</div>;
  }

  if (!role) {
    // infoToast({ text: "User unauthorized!" });
    return <Navigate to="/auth/signin" replace />;
  }

  // console.log(allowedRoles);
  // console.log(allowedRoles && allowedRoles.includes(role));

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/forbidden" replace />;
  }

  return <Outlet />;
};

export default PrtoectedRoute;
