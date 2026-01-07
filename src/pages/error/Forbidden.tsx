import { useSelector } from "react-redux";
import { Link } from "react-router";
import { userError, userRole } from "../../../features/user/userSelector";

const Forbidden = () => {
  const role = useSelector(userRole);

  const userErrorMessage = useSelector(userError);

  const link = () => {
    if (userErrorMessage === "Unauthorized!") {
      return "/auth/signin";
    } else {
      return role == "employer" ? "/employer/home" : "/candidate/home";
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
