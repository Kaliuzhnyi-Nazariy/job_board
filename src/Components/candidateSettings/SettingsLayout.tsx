import { NavLink, Outlet } from "react-router";

import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

const basicStyles = "px-5 py-3 flex gap-2 items-center relative";
const activeStyles = `text-(--primary5) before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-full before:h-px before:bg-(--primary5)`;

const SettingsLayout = () => {
  return (
    <div className="flex flex-col mt-12 ml-12">
      <h5
        style={{
          marginBottom: 12,
        }}
      >
        Settings
      </h5>
      <nav className="flex gap-3">
        {/* <Link to="personal" className="px-5 py-3 flex gap-2 items-center"> */}
        <NavLink
          to="personal"
          className={({ isActive }) =>
            `${basicStyles} ${isActive && activeStyles}`
          }
        >
          <PersonOutlineOutlinedIcon className="size-6" />
          Personal
        </NavLink>
        {/* <Link to="profile" className="px-5 py-3 flex gap-2 items-center"> */}
        <NavLink
          to="profile"
          className={({ isActive }) =>
            `${basicStyles} ${isActive && activeStyles}`
          }
        >
          <AccountCircleOutlinedIcon className="size-6" />
          Profile
        </NavLink>
        <NavLink
          to="social"
          className={({ isActive }) =>
            `${basicStyles} ${isActive && activeStyles}`
          }
        >
          <LanguageOutlinedIcon className="size-6" />
          Social Links
        </NavLink>
        <NavLink
          to="account"
          className={({ isActive }) =>
            `${basicStyles} ${isActive && activeStyles}`
          }
        >
          <SettingsOutlinedIcon className="size-6" />
          Account Setting
        </NavLink>
      </nav>

      <Outlet />
    </div>
  );
};

export default SettingsLayout;
