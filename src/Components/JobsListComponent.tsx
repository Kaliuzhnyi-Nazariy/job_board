import { Link } from "react-router";

import ArrowRightAltOutlinedIcon from "@mui/icons-material/ArrowRightAltOutlined";
// import { useQuery } from "@tanstack/react-query";
// import { getFiveRecentJobs } from "../../features/job/jobRequests";
import type { EmployerRecentJobs } from "../../features/job/interfaces";
import { dateFormat, workTimeFormat } from "../helpers";
// import ApplicationStatusBadge from "../ApplicationStatusBadge";
import CandidatesNumberBadge from "./CandidatesNumberBadge";

const JobsListComponent = ({
  loadingRecentJobs,
  recentJobs,
  title,
  isLink,
}: {
  loadingRecentJobs: boolean;
  recentJobs: EmployerRecentJobs[];
  title: string;
  isLink: boolean;
}) => {
  //   const {
  //     data: recentJobs,
  //     isLoading: loadingRecentJobs,
  //     // isError: isRecentJobsError,
  //   } = useQuery({
  //     queryKey: ["myRecentJobs"],
  //     queryFn: getFiveRecentJobs,
  //   });

  return (
    <div className=" h-150 mt-8 relative">
      <div className="w-full flex justify-between items-center">
        {/* <h4 className="body_medium_500">Recently Applied</h4> */}
        <h4 className="body_medium_500">{title}</h4>
        {isLink && (
          <Link
            to={"my-jobs"}
            className="flex gap-2 items-center text-(--gray5)"
          >
            View all <ArrowRightAltOutlinedIcon />
          </Link>
        )}
      </div>

      {loadingRecentJobs ? (
        <p className="absolute top-1/2 left-1/2 -translate-x-1/2">Loading...</p>
      ) : recentJobs && recentJobs.length > 0 ? (
        <>
          <ul className="w-full grid grid-cols-[2fr_1fr_1fr_1fr] px-5 py-2.5 body_xs bg-(--gray50) mt-4 uppercase">
            <li>Job</li>
            <li className="justify-self-center">Date Posting</li>
            <li className="justify-self-center">applications</li>
            <li className="justify-self-center">Action</li>
          </ul>
          <ul className="w-full mt-2">
            {recentJobs.map((rj: EmployerRecentJobs) => {
              return (
                <li
                  key={rj.id}
                  className="p-5 grid grid-cols-[2fr_1fr_1fr_1fr]"
                >
                  <div className="flex flex-col gap-2">
                    <h2 className="body_medium_500">{rj.title}</h2>
                    <p className="text-(--gray5) body_small">
                      {workTimeFormat(rj.work_time)}
                    </p>
                  </div>
                  <p className="body_small text-(--gray6) flex items-center">
                    {dateFormat(rj.created_at)}
                  </p>
                  <CandidatesNumberBadge
                    numberOfApplications={rj.applications_count}
                  />
                  <Link
                    to={"/employer/dashboard/view-application/" + rj.id}
                    className="px-6 py-3 rounded-sm bg-(--gray50) text-(--primary5) button hover:bg-(--primary5) hover:text-white transition-colors duration-150"
                  >
                    View Applications
                  </Link>
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <p>No posted jobs yet!</p>
      )}
    </div>
  );
};

export default JobsListComponent;
