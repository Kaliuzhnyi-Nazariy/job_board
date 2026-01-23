import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getJob } from "../../../features/job/jobRequests";
import ApplyModal from "../../Components/modals/ApplyModal";
import React from "react";
import { workTimeFormat } from "../../helpers/jobTimeFormat";

const Job = () => {
  const { jobId } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["job", jobId],
    queryFn: () => getJob(jobId!),
  });

  console.log(data);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error ocured!</p>;
  }

  const {
    title,
    work_time,
    description,
    responsibilities,
    education,
    experience,
    location,
    salary,
  } = data.jobs;

  return (
    <div className="">
      <div className="flex justify-between">
        <div className="flex items-center">
          <h3>{title}</h3>
          <span className="px-3 py-0.75 bg-blue-400/20 text-blue-500">
            {workTimeFormat(work_time)}
          </span>
        </div>
        <button type="button" onClick={handleOpen}>
          Apply now
        </button>
      </div>
      <div className="flex gap-12.5">
        <div className="w-full">
          <>
            <h4>Job Description</h4>
            <article>{description || "No description"}</article>
          </>
          <>
            <h4>Responsibilities</h4>
            <article>{responsibilities || "No responsibilities"}</article>
          </>
        </div>
        <div className="w-full">
          <h5>Job overview</h5>
          <ul className="grid grid-cols-2">
            <li>
              <div>
                <div className="size-8"></div>
                <span>EDUCATION</span>
                <p>{education}</p>
              </div>
            </li>
            <li>
              <div>
                <div className="size-8"></div>
                <span>SALARY</span>
                <p>{salary}</p>
              </div>
            </li>
            <li>
              <div>
                <div className="size-8"></div>
                <span>LOCATION</span>
                <p>{location}</p>
              </div>
            </li>
            <li>
              <div>
                <div className="size-8"></div>
                <span>JOB TYPE</span>
                <p>{workTimeFormat(work_time)}</p>
              </div>
            </li>
            <li>
              <div>
                <div className="size-8"></div>
                <span>EXPERIENCE</span>
                <p>{experience}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <ApplyModal
        open={open}
        handleClose={handleClose}
        jobTitle={title}
        jobId={jobId!}
      />
    </div>
  );
};

export default Job;
