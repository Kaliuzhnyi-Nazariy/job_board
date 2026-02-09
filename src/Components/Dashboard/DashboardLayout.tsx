import React from "react";
import Section from "../Section";
import { useAppDispatch } from "../../../features/hooks/dispatchHook";
import { Outlet, useNavigate } from "react-router";
import { logout } from "../../../features/auth/authRequest";

import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

const DashboardLayout = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  const liStyle =
    "flex gap-4 items-center px-5 py-2.5 transition-colors duration-100 w-full h-11 ";

  const inactive = " hover:text-black hover:bg-(--gray50)";

  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await dispatch(logout());
      navigate("/auth/signin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Section extraStyles="flex">
      <div className="flex flex-col justify-between">
        <div>
          <h4
            className="uppetcase body_xs_500 text-(--gray4) ml-5 w-72 "
            style={{ marginBottom: 12 }}
          >
            {title}
          </h4>
          {children}
          {/* <nav className="body_small_500 text-(--gray5) h-full ">
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
          </nav>*/}
        </div>

        <button
          className={
            `${liStyle} ${inactive}` + "mt-auto cursor-pointer pl-5 mb-6"
          }
          onClick={handleLogout}
        >
          <LogoutOutlinedIcon className="size-6" /> Log-out
        </button>
      </div>

      <Outlet />
    </Section>
  );
};

export default DashboardLayout;
