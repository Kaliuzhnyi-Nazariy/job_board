import React from "react";
import Section from "../Section";
import { useAppDispatch } from "../../../features/hooks/dispatchHook";
import { Outlet, useNavigate } from "react-router";
import { logout } from "../../../features/auth/authRequest";

import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { errorToast, successToast } from "../Toasts/Toasts";

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
      successToast({ text: "Logged out successfully!" });
    } catch (error) {
      errorToast({
        text: (error as { message: string }).message || "Something went wrong!",
      });
    }
  };

  return (
    <Section extraStyles="flex flex-col-reverse min-[1440px]:flex-row">
      <div className="flex flex-col justify-between mt-3 min-[1024px]:mt-6">
        <h4
          className="uppetcase body_xs_500 text-(--gray4) ml-5 w-full min-[1440px]:w-72 "
          style={{ marginBottom: 12 }}
        >
          {title}
        </h4>
        {children}

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
