import { NavLink, Outlet } from "react-router";
import Section from "../../Components/Section";

import FilterNoneOutlinedIcon from "@mui/icons-material/FilterNoneOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

const Dashboard = () => {
  const baseURL = "/candidate/dashboard";

  const liStyle =
    "flex gap-4 items-center px-5 py-2.5 transition-colors duration-100 w-full h-full";

  const active = " bg-(--primary50) text-(--primary5)";
  const inactive = " hover:text-black hover:bg-(--gray50)";

  return (
    <Section extraStyles="flex">
      <div>
        <h4
          className="uppetcase body_xs_500 text-(--gray4) ml-5 w-72 "
          style={{ marginBottom: 12 }}
        >
          candidate dashboard
        </h4>
        <nav className="body_small_500 text-(--gray5) ">
          <NavLink
            to={baseURL}
            end
            className={({ isActive }) =>
              `${liStyle} ${isActive ? active : inactive}`
            }
          >
            <FilterNoneOutlinedIcon className="size-6" /> Overview
          </NavLink>

          <NavLink
            to={`${baseURL}/applied-jobs`}
            end
            className={({ isActive }) =>
              `${liStyle} ${isActive ? active : inactive}`
            }
          >
            <WorkOutlineOutlinedIcon className="size-6" /> Applied Jobs
          </NavLink>

          <NavLink to={baseURL} className={`${liStyle} ${inactive}`}>
            <BookmarkBorderOutlinedIcon className="size-6" /> Favorite Jobs
          </NavLink>

          <NavLink to={baseURL} className={`${liStyle} ${inactive}`}>
            <NotificationsActiveOutlinedIcon className="size-6" /> Job alert
          </NavLink>

          <NavLink
            to={`${baseURL}/setting`}
            className={({ isActive }) =>
              `${liStyle} ${isActive ? active : inactive}`
            }
          >
            <SettingsOutlinedIcon className="size-6" /> Settings
          </NavLink>
        </nav>
      </div>

      <Outlet />
    </Section>
  );
};

export default Dashboard;
