import { Link, Outlet, useLocation } from "react-router";
import Section from "../../Components/Section";

import FilterNoneOutlinedIcon from "@mui/icons-material/FilterNoneOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

const Dashboard = () => {
  const baseURL = "/candidate/dashboard";

  const { pathname } = useLocation();

  // console.log("sdf/ddr5".endsWith("5"));

  const liStyle =
    "flex gap-4 items-center px-5 py-2.5 transition-colors duration-100 w-full h-ful";

  return (
    <Section extraStyles="flex gap-5">
      <div className="outline outline-orange-600">
        <h4
          className="uppetcase body_xs_500 text-(--gray4) ml-5 w-72 "
          style={{ marginBottom: 12 }}
        >
          candidate dashboard
        </h4>
        <nav className="body_small_500 text-(--gray5) ">
          <Link
            to={`${baseURL}`}
            className={
              liStyle +
              (pathname.endsWith("dashboard")
                ? " bg-(--primary50) text-(--primary5)"
                : " hover:text-black hover:bg-(--gray50)")
            }
          >
            <FilterNoneOutlinedIcon className="size-6" /> Overview
          </Link>
          <Link
            to={`${baseURL}/applied-jobs`}
            className={
              liStyle +
              (pathname.endsWith("applied-jobs")
                ? " bg-(--primary50) text-(--primary5)"
                : " hover:text-black hover:bg-(--gray50)")
            }
          >
            <WorkOutlineOutlinedIcon className="size-6" /> Applied Jobs
          </Link>
          <Link
            to={`${baseURL}/`}
            className={liStyle + " hover:text-black hover:bg-(--gray50)"}
          >
            {" "}
            <BookmarkBorderOutlinedIcon className="size-6" /> Favorite Jobs
          </Link>
          <Link
            to={`${baseURL}/`}
            className={liStyle + " hover:text-black hover:bg-(--gray50)"}
          >
            {" "}
            <NotificationsActiveOutlinedIcon className="size-6" /> Job alert
          </Link>
          <Link
            to={`${baseURL}/setting`}
            className={
              liStyle +
              (pathname.includes("setting")
                ? " bg-(--primary50) text-(--primary5)"
                : " hover:text-black hover:bg-(--gray50)")
            }
          >
            {" "}
            <SettingsOutlinedIcon className="size-6" /> Settings
          </Link>
        </nav>
      </div>

      <Outlet />
    </Section>
  );
};

export default Dashboard;
