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
  return (
    <div className=" min-[1024px]:h-150 mt-8 relative mx-auto w-full">
      <div className="w-full flex justify-between items-center">
        {/* <h4 className="body_medium_500">Recently Applied</h4> */}
        <h4 className="body_medium_500">{title}</h4>
        {isLink && (
          <Link
            to={"my-jobs"}
            className="flex gap-2 items-center text-(--gray5) text-[12px] min-[425px]:text-[14px]"
          >
            View all <ArrowRightAltOutlinedIcon />
          </Link>
        )}
      </div>

      {loadingRecentJobs ? (
        <p className="absolute top-1/2 left-1/2 -translate-x-1/2">Loading...</p>
      ) : recentJobs && recentJobs.length > 0 ? (
        <>
          <ul className="w-full grid grid-cols-3 min-[1024px]:grid-cols-[2fr_1fr_1fr_1fr] px-2.5 py-2.5 body_xs bg-(--gray50) mt-4 uppercase min-[1024px]:px-5">
            <li>Job</li>
            <li className="justify-self-center hidden min-[1024px]:block ">
              Date Posting
            </li>
            <li className="justify-self-center">applications</li>
            <li className="justify-self-center">Action</li>
          </ul>
          <ul className="w-full mt-2">
            {recentJobs.map((rj: EmployerRecentJobs) => {
              return (
                <li
                  key={rj.id}
                  className="p-2 min-[1024px]:p-5 grid grid-cols-3 w-full min-[1024px]:grid-cols-[2fr_1fr_1fr_1fr] "
                >
                  <div className="flex flex-col gap-2">
                    <h2 className="body_medium_500">{rj.title}</h2>
                    <p className="text-(--gray5) body_small">
                      {workTimeFormat(rj.work_time)}
                    </p>
                  </div>
                  <p className="body_small text-(--gray6) hidden min-[1024px]:flex items-center ">
                    {dateFormat(rj.created_at)}
                  </p>
                  <CandidatesNumberBadge
                    numberOfApplications={rj.applications_count}
                  />
                  <Link
                    to={"/employer/dashboard/view-application/" + rj.id}
                    className="px-6 py-3 rounded-sm bg-(--gray50) text-(--primary5) button hover:bg-(--primary5) hover:text-white transition-colors duration-150 max-[1151px]:text-center min-[1152px]:flex items-center justify-between"
                  >
                    View{" "}
                    <span className="hidden min-[1152px]:block">
                      {" "}
                      Applications
                    </span>
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
