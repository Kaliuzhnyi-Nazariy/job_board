import { useQuery } from "@tanstack/react-query";
import { getMyJobs } from "../../../../features/job/jobRequests";
import JobCard from "./JobCard";
import type { IJob } from "../../../../features/job/interfaces";

const MyJobs = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["myjobs"],
    queryFn: getMyJobs,
    retry: false,
  });

  if (isLoading && !isError) {
    return <p>Loading...</p>;
  }

  // in the future I will add ststuse and filter on that page

  return (
    <div className="w-full px-5 mt-3">
      <div className="flex justify-between">
        <h1>My Jobs</h1>
        {/* <p>Number of jobs: {data.job ? data.job.length : 0}</p> */}
      </div>
      {isLoading && <p>Loading...</p>}

      {isError && <p>Error occured!</p>}

      {data && data.job && data.job.length > 0 ? (
        <ul>
          {data.job.map((j: IJob) => {
            return (
              <li key={j.id}>
                <JobCard data={j} />
              </li>
            );
          })}
        </ul>
      ) : (
        <p>There are no your jobs!</p>
      )}
    </div>
  );
};

export default MyJobs;
