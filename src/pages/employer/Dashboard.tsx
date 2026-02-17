import { NavLink } from "react-router";
import DashboardLayout from "../../Components/Dashboard/DashboardLayout";

import FilterNoneOutlinedIcon from "@mui/icons-material/FilterNoneOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import SegmentOutlinedIcon from "@mui/icons-material/SegmentOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

const Dashboard = () => {
  const baseURL = "/employer/dashboard";

  const liStyle =
    "flex gap-4 items-center px-5 py-2.5 transition-colors duration-100 w-full h-11 ";

  const active = " bg-(--primary50) text-(--primary5)";
  const inactive = " hover:text-black hover:bg-(--gray50)";
  const noPage = "cursor-not-allowed";

  return (
    <DashboardLayout title="EMPLOYERS DASHBOARD">
      <nav className="body_small_500 text-(--gray5) h-full min-[425px]:grid min-[425px]:grid-cols-2 min-[600px]:grid-cols-3 min-[1024px]:grid-cols-4 min-[1440px]:block ">
        <NavLink
          to={baseURL}
          end
          className={({ isActive }) => {
            return `${liStyle} ${isActive ? active : inactive}`;
          }}
        >
          <FilterNoneOutlinedIcon className="size-6" />
          Overview
        </NavLink>

        <NavLink to={baseURL} className={`${liStyle} ${inactive} ${noPage}`}>
          <AccountCircleOutlinedIcon className="size-6" />
          Employer Profile
        </NavLink>

        <NavLink
          to={`${baseURL}/post-a-job`}
          end
          className={({ isActive }) => {
            return `${liStyle} ${isActive ? active : inactive}`;
          }}
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
        >
          <WorkOutlineOutlinedIcon className="size-6" />
          My Jobs
        </NavLink>
        <NavLink to={baseURL} className={`${liStyle} ${inactive} ${noPage}`}>
          <BookmarkBorderOutlinedIcon className="size-6" />
          Saved Candidates
        </NavLink>
        <NavLink to={baseURL} className={`${liStyle} ${inactive} ${noPage}`}>
          <ReceiptLongOutlinedIcon className="size-6" />
          Plans & Billing
        </NavLink>
        <NavLink to={baseURL} className={`${liStyle} ${inactive} ${noPage}`}>
          <SegmentOutlinedIcon />
          All Companies
        </NavLink>
        {/* <NavLink
          to={`${baseURL}/setting`}
          className={({ isActive }) =>
            `${liStyle} ${isActive ? active : inactive}`
          }
        > */}
        <NavLink to={baseURL} className={`${liStyle} ${inactive} ${noPage}`}>
          <SettingsOutlinedIcon className="size-6" /> Settings
        </NavLink>
      </nav>
    </DashboardLayout>
  );
};

export default Dashboard;
