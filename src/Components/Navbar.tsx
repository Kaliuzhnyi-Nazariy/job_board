import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router";
import { userRole } from "../../features/user/userSelector";

import PhoneInTalkOutlinedIcon from "@mui/icons-material/PhoneInTalkOutlined";

const Navbar = () => {
  const role = useSelector(userRole);

  const { pathname } = useLocation();

  const homeLink = () => {
    return role == "employer" ? "/employer/home" : "/candidate/home";
  };

  const findLink = () => {
    if (role == "employer") {
      return (
        <Link to="/employer/candidates" className="h-full flex items-center">
          Find Employers
        </Link>
      );
    } else {
      return (
        <Link to="/candidate/find-job" className="h-full flex items-center">
          Find Job
        </Link>
      );
    }
  };

  const dashboardLink =
    role == "employer" ? "/employer/dashboard" : "/candidate/dashboard";

  return (
    <header className="bg-(--grey50) px-75 h-12 flex justify-between">
      <nav>
        <ul className="flex gap-6 h-full">
          {/* <li
            className={`flex items-center hover:text-(--primary4) border-b-transparent border-b-2 hover:border-b-(--primary4) ${
              pathname.includes("home") &&
              "text-(--primary5) border-b-(--primary5)"
            } transition-all duration-150`}
          > */}
          <li
            className={`flex items-center border-b-transparent border-b-2 transition-all duration-150 hover:border-b-(--primary4) ${
              pathname.includes("home")
                ? "text-(--primary5)"
                : "hover:text-(--primary4)"
            }`}
            style={
              pathname.includes("home")
                ? { borderBottomColor: "var(--primary5)" }
                : { borderBottomColor: "transparent" }
            }
          >
            <Link to={homeLink()} className="h-full flex items-center">
              Home
            </Link>
          </li>
          <li
            className={`flex items-center border-b-transparent border-b-2 transition-all duration-150 hover:border-b-(--primary4) ${
              pathname.includes("candidates") || pathname.includes("job")
                ? "text-(--primary5)"
                : "hover:text-(--primary4)"
            }`}
            style={
              pathname.includes("candidates") || pathname.includes("job")
                ? { borderBottomColor: "var(--primary5)" }
                : { borderBottomColor: "transparent" }
            }
          >
            {findLink()}
          </li>
          <li
            className={`flex items-center border-b-transparent border-b-2 transition-all duration-150 hover:border-b-(--primary4) ${
              pathname.includes("dashboard")
                ? "text-(--primary5)"
                : "hover:text-(--primary4)"
            }`}
            style={
              pathname.includes("dashboard")
                ? { borderBottomColor: "var(--primary5)" }
                : { borderBottomColor: "transparent" }
            }
          >
            <Link to={dashboardLink} className="h-full flex items-center">
              Dashboard
            </Link>
          </li>
        </ul>
      </nav>
      <span className="flex gap-2 items-center body_small_500">
        <PhoneInTalkOutlinedIcon />
        <p>+1-202-555-0178</p>
      </span>
    </header>
  );
};

export default Navbar;
