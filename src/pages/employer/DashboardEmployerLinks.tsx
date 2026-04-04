import { NavLink, useNavigate } from "react-router";

import FilterNoneOutlinedIcon from "@mui/icons-material/FilterNoneOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import SegmentOutlinedIcon from "@mui/icons-material/SegmentOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useAppDispatch } from "../../../features/hooks/dispatchHook";
import { logout } from "../../../features/auth/authRequest";
import { errorToast, successToast } from "../../Components/Toasts/Toasts";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

const DashboardEmployerLinks = ({ onClick }: { onClick?: () => void }) => {
  const baseURL = "/employer/dashboard";

  const liStyle =
    "flex gap-4 items-center px-5 py-2.5 transition-colors duration-100 w-full h-11 ";

  const active = " bg-(--primary50) text-(--primary5)";
  const inactive = " hover:text-black hover:bg-(--gray50)";
  const noPage = "cursor-not-allowed";

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
      <nav className="body_small_500 text-(--gray5) h-full min-[425px]:grid min-[425px]:grid-cols-2 min-[600px]:grid-cols-3 min-[1024px]:grid-cols-4 min-[1440px]:block ">
        <NavLink
          to={baseURL}
          end
          className={({ isActive }) => {
            return `${liStyle} ${isActive ? active : inactive}`;
          }}
          onClick={onClick}
        >
          <FilterNoneOutlinedIcon className="size-6" />
          Overview
        </NavLink>

        <NavLink
          to={baseURL}
          className={`${liStyle} ${inactive} ${noPage}`}
          onClick={onClick}
        >
          <AccountCircleOutlinedIcon className="size-6" />
          Employer Profile
        </NavLink>

        <NavLink
          to={`${baseURL}/post-a-job`}
          end
          className={({ isActive }) => {
            return `${liStyle} ${isActive ? active : inactive}`;
          }}
          onClick={onClick}
        >
          <ControlPointOutlinedIcon className="size-6" />
          Post a Job
        </NavLink>

        <NavLink
          to={`${baseURL}/my-jobs`}
          end
          className={({ isActive }) => {
            return `${liStyle} ${isActive ? active : inactive}`;
          }}
          onClick={onClick}
        >
          <WorkOutlineOutlinedIcon className="size-6" />
          My Jobs
        </NavLink>
        <NavLink
          to={baseURL}
          className={`${liStyle} ${inactive} ${noPage}`}
          onClick={onClick}
        >
          <BookmarkBorderOutlinedIcon className="size-6" />
          Saved Candidates
        </NavLink>
        <NavLink
          to={baseURL}
          className={`${liStyle} ${inactive} ${noPage}`}
          onClick={onClick}
        >
          <ReceiptLongOutlinedIcon className="size-6" />
          Plans & Billing
        </NavLink>
        <NavLink
          to={baseURL}
          className={`${liStyle} ${inactive} ${noPage}`}
          onClick={onClick}
        >
          <SegmentOutlinedIcon />
          All Companies
        </NavLink>
        {/* <NavLink
          to={`${baseURL}/setting`}
          className={({ isActive }) =>
            `${liStyle} ${isActive ? active : inactive}`
          }
        > */}
        <NavLink
          to={`${baseURL}/settings`}
          end
          className={({ isActive }) => {
            return `${liStyle} ${isActive ? active : inactive}`;
          }}
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

export default DashboardEmployerLinks;
