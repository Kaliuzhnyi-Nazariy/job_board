import { useSelector } from "react-redux";
import { username } from "../../../features/user/userSelector";
import { useQuery } from "@tanstack/react-query";
import { getMyJobs, getRecentJobs } from "../../../features/job/jobRequests";
import { Link } from "react-router";
import type { EmployerRecentJobs } from "../../../features/job/interfaces";
import { workTimeFormat } from "../../helpers/jobTimeFormat";

const Overview = () => {
  const usernameValue = useSelector(username);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["myjobs"],
    queryFn: getMyJobs,
  });

  const {
    data: recentJobs,
    isLoading: loadingRecentJobs,
    isError: isRecentJobsError,
  } = useQuery({
    queryKey: ["myRecentJobs"],
    queryFn: getRecentJobs,
  });

  return (
    <div className="w-full">
      <h1>Hello, {usernameValue}</h1>
      <span>
        <p>
          {isError
            ? "Error ocured!"
            : isLoading
            ? "Loading"
            : `${data.job.length} jobs`}
        </p>
      </span>
      <span>
        <p>2, 517 saved candidates</p>
      </span>

      <div className="w-full">
        <div className="flex w-full justify-between">
          <h4>Recently Posted Jobs</h4>
          <Link to="/employer/dashboard/my-jobs">View all</Link>
        </div>
        {loadingRecentJobs ? (
          <p>Loading...</p>
        ) : recentJobs.length > 0 ? (
          <ul>
            {recentJobs.map((rj: EmployerRecentJobs) => {
              return (
                <li key={rj.id}>
                  <Link
                    to={`my-jobs/` + rj.id}
                    className="flex w-full items-center justify-between"
                  >
                    <div className="">
                      <h1>{rj.title}</h1>
                      <p>{workTimeFormat(rj.work_time)}</p>
                    </div>

                    <p>{rj.status}</p>

                    <p>
                      {rj.applications_count > 0
                        ? rj.applications_count > 1
                          ? rj.applications_count + " applcations"
                          : rj.applications_count + " application"
                        : "No applications"}
                    </p>

                    <Link to={"/employer/view-application/" + rj.id}>
                      View Applications
                    </Link>
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>No recent jobs</p>
        )}
      </div>
    </div>
  );
};

export default Overview;
