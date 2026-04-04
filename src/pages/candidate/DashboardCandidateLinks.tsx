import { NavLink, useNavigate } from "react-router";

import FilterNoneOutlinedIcon from "@mui/icons-material/FilterNoneOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useAppDispatch } from "../../../features/hooks/dispatchHook";
import { logout } from "../../../features/auth/authRequest";
import { errorToast, successToast } from "../../Components/Toasts/Toasts";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

const DashboardCandidateLinks = ({
  onClick,
}: // extraStyle,
{
  onClick?: () => void;
  extraStyle?: string;
}) => {
  const baseURL = "/candidate/dashboard";

  const liStyle =
    "flex gap-4 items-center px-5 py-2.5 transition-colors duration-100 w-full h-11 ";

  const active = " bg-(--primary50) text-(--primary5)";
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
    <div className="flex flex-col lg:justify-between lg:h-full">
      <nav className="body_small_500 text-(--gray5) h-full ">
        <NavLink
          to={baseURL}
          end
          className={({ isActive }) =>
            `${liStyle} ${isActive ? active : inactive}`
          }
          onClick={onClick}
        >
          <FilterNoneOutlinedIcon className="size-6" /> Overview
        </NavLink>

        <NavLink
          to={`${baseURL}/applied-jobs`}
          end
          className={({ isActive }) =>
            `${liStyle} ${isActive ? active : inactive}`
          }
          onClick={onClick}
        >
          <WorkOutlineOutlinedIcon className="size-6" /> Applied Jobs
        </NavLink>

        <NavLink
          to={baseURL}
          className={`${liStyle} ${inactive}`}
          onClick={onClick}
        >
          <BookmarkBorderOutlinedIcon className="size-6" /> Favorite Jobs
        </NavLink>

        <NavLink
          to={baseURL}
          className={`${liStyle} ${inactive}`}
          onClick={onClick}
        >
          <NotificationsActiveOutlinedIcon className="size-6" /> Job alert
        </NavLink>

        <NavLink
          to={`${baseURL}/setting`}
          className={({ isActive }) =>
            `${liStyle} ${isActive ? active : inactive}`
          }
          onClick={onClick}
        >
          <SettingsOutlinedIcon className="size-6" /> Settings
        </NavLink>
      </nav>
      <button
        className={
          `${liStyle} ${inactive}` +
          "mt-auto cursor-pointer pl-5 mb-6 lg:flex-1"
        }
        onClick={handleLogout}
      >
        <LogoutOutlinedIcon className="size-6" /> Log-out
      </button>
    </div>
  );
};

export default DashboardCandidateLinks;
