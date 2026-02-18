import { useSelector } from "react-redux";
import { NavLink } from "react-router";
import { userRole } from "../../../features/user/userSelector";

import PhoneInTalkOutlinedIcon from "@mui/icons-material/PhoneInTalkOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MobMenu from "./MobMenu";
import { useState } from "react";

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

  const navItem =
    "flex items-center border-b-2 transition-all duration-150 w-full text-center justify-center text-nowrap ";

  const active = "text-(--primary5)";

  const inactive =
    "hover:text-(--primary4) hover:border-b-(--primary4) border-transparent";

  const [isMobMenuOpen, setMobMenu] = useState(false);

  const closeMenu = () => {
    setMobMenu(false);
    document.body.classList.remove("disable_scrolling");
  };

  return (
    <header className="bg-(--gray50) h-12 flex justify-between px-3 min-[428px]:px-6 min-[1024px]:px-8 min-[1440px]:px-22 min-[1920px]:px-75 z-10 w-full">
      <nav className="min-[1024px]:flex gap-6 h-full hidden">
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
      <span className="hidden min-[744px]:flex gap-2 items-center body_small_500">
        <PhoneInTalkOutlinedIcon />
        <p>+1-202-555-0178</p>
      </span>
      <button
        className="ml-auto min-[1024px]:hidden"
        onClick={() => {
          if (isMobMenuOpen) {
            closeMenu();
          } else {
            setMobMenu(true);
          }
        }}
      >
        <MenuOutlinedIcon />
      </button>
      <MobMenu isOpen={isMobMenuOpen} closeMenu={closeMenu} />
    </header>
  );
};

export default Navbar;
