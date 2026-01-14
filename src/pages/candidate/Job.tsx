import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getJob } from "../../../features/job/jobRequests";

const Job = () => {
  const { jobId } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["job", jobId],
    queryFn: () => getJob(jobId!),
  });

  console.log(data);

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
    responsobilities,
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
            {work_time}
          </span>
        </div>
        <button>Apply now</button>
      </div>
      <div className="flex gap-12.5">
        <div className="w-full">
          <>
            <h4>Job Description</h4>
            <article>{description || "No description"}</article>
          </>
          <>
            <h4>Responsibilities</h4>
            <article>{responsobilities || "No responsibilities"}</article>
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
                <p>{work_time}</p>
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
    </div>
  );
};

export default Job;
