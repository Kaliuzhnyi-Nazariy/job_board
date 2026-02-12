import { useSelector } from "react-redux";
import { NavLink } from "react-router";
import { userRole } from "../../features/user/userSelector";

import PhoneInTalkOutlinedIcon from "@mui/icons-material/PhoneInTalkOutlined";

const Navbar = () => {
  const role = useSelector(userRole);

  // const homeLink = () => {
  //   return role == "employer" ? "/employer/home" : "/candidate/home";
  // };

  const findLink = () => {
    if (role == "employer") {
      return { path: "/employer/candidates", text: "Find Employers" };
    } else {
      return { path: "/candidate/find-job", text: "Find Job" };
    }
  };

  const dashboardLink =
    role == "employer" ? "/employer/dashboard" : "/candidate/dashboard";

  const navItem = "flex items-center border-b-2 transition-all duration-150";

  const active = "text-(--primary5)";

  const inactive =
    "hover:text-(--primary4) hover:border-b-(--primary4) border-transparent";

  return (
    <header className="bg-(--gray50) px-75 h-12 flex justify-between">
      <nav className="flex gap-6 h-full">
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            `${navItem} ${isActive ? active : inactive}`
          }
          style={({ isActive }) =>
            isActive ? { borderBottomColor: "var(--primary5)" } : undefined
          }
        >
          Home
        </NavLink>
        <NavLink
          to={findLink().path}
          className={({ isActive }) =>
            `${navItem} ${isActive ? active : inactive}`
          }
          style={({ isActive }) =>
            isActive ? { borderBottomColor: "var(--primary5)" } : undefined
          }
        >
          {findLink().text}
        </NavLink>
        <NavLink
          to={dashboardLink}
          className={({ isActive }) =>
            `${navItem} ${isActive ? active : inactive}`
          }
          style={({ isActive }) =>
            isActive ? { borderBottomColor: "var(--primary5)" } : undefined
          }
        >
          Dashboard
        </NavLink>
      </nav>
      <span className="flex gap-2 items-center body_small_500">
        <PhoneInTalkOutlinedIcon />
        <p>+1-202-555-0178</p>
      </span>
    </header>
  );
};

export default Navbar;
