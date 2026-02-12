import { useSelector } from "react-redux";
import { Link } from "react-router";
import {
  userError,
  userInitialized,
  userRole,
} from "../../../features/user/userSelector";
import { authLoading } from "../../../features/auth/authSelector";

const Forbidden = () => {
  const role = useSelector(userRole);

  const userErrorMessage = useSelector(userError);
  const userInitializedValue = useSelector(userInitialized);
  const isAuthLoading = useSelector(authLoading);

  const link = () => {
    if (
      userErrorMessage ||
      // userErrorMessage === "Unauthorized!" ||
      (!role && userInitializedValue && !isAuthLoading)
    ) {
      return "/auth/signin";
    } else {
      return "/";
      // return role == "employer" ? "/employer/home" : "/candidate/home";
    }
  };

  return (
    <div>
      <h1>Forbidden</h1>
      <Link to={link()}>Go home</Link>
    </div>
  );
};

export default Forbidden;
