import { useSelector } from "react-redux";
import { Link } from "react-router";
import { userRole } from "../../features/user/userSelector";

const Navbar = () => {
  const role = useSelector(userRole);

  const homeLink = () => {
    return role == "employer" ? "/employer/home" : "/candidate/home";
  };

  const findLink = () => {
    if (role == "employer") {
      return <Link to="#">Find Employers</Link>;
    } else {
      return <Link to="/candidate/find-job">Find Job</Link>;
    }
  };

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to={homeLink()}>Home</Link>
          </li>
          <li>{findLink()}</li>
          <li>
            <Link to="#">Dashboard</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
