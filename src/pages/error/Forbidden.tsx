import { useSelector } from "react-redux";
import { Link } from "react-router";
import { userRole } from "../../../features/user/userSelector";

const Forbidden = () => {
  const role = useSelector(userRole);

  const link = () => {
    return role == "employer" ? "/employer/home" : "/candidate/home";
  };

  return (
    <div>
      <h1>Forbidden</h1>
      <Link to={link()}>Go home</Link>
    </div>
  );
};

export default Forbidden;
