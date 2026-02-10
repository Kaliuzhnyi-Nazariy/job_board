import { useSelector } from "react-redux";
import { userLoading, username } from "../../../features/user/userSelector";
import { useQuery } from "@tanstack/react-query";
import {
  getFiveRecentJobs,
  getMyJobs,
} from "../../../features/job/jobRequests";
import { Link } from "react-router";
import DashboardSection from "../../Components/Dashboard/DashboardSection";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import JobsListComponent from "../../Components/JobsListComponent";

const Overview = () => {
  const usernameValue = useSelector(username);
  const isUserLoading = useSelector(userLoading);
  const {
    data,
    isLoading,
    // isError
  } = useQuery({
    queryKey: ["myjobs"],
    queryFn: () => getMyJobs(1),
  });

  const {
    data: recentJobs,
    isLoading: loadingRecentJobs,
    // isError: isRecentJobsError,
  } = useQuery({
    queryKey: ["myRecentJobs"],
    queryFn: getFiveRecentJobs,
  });

  return (
    <DashboardSection>
      <h2 className="body_large_500">
        Hello,{" "}
        {isUserLoading ? "Loading..." : usernameValue ? usernameValue : "user"}
      </h2>
      <small className="body_small text-(--gray4)">
        Here is your daily activities and applications{" "}
      </small>
      <Link
        to={`my-jobs`}
        className="w-78 h-26 bg-(--primary50) px-6 py-5 rounded-lg flex gap-6 justify-between items-center cursor-pointer mt-6"
      >
        <div className="flex flex-col gap-1 justify-center  ">
          <p className="font-semibold text-2xl">
            {isLoading ? "Loading..." : data.meta.allAmountOfJobs}
          </p>
          <p className="body_small">jobs</p>
        </div>
        <div className="size-16 bg-white rounded-[5px] p-4">
          <WorkOutlineOutlinedIcon
            sx={{ fill: "var(--primary5)", fontSize: "32px" }}
          />
        </div>
      </Link>

      <JobsListComponent
        recentJobs={recentJobs}
        isLink={true}
        loadingRecentJobs={loadingRecentJobs}
        title="Recent Posted Jobs"
      />
    </DashboardSection>
  );
};

export default Overview;
