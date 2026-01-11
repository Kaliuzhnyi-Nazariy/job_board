import { useQuery } from "@tanstack/react-query";
import { getMyJob } from "../../../../features/job/jobRequests";
import { useParams } from "react-router";
import type { Job } from "../../../../features/job/interfaces";
import { useState } from "react";

// TO-DO:
// make form and default values take from data from backend
// change values in input on form values

const Job = () => {
  const { jobId } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["myJob"],
    queryFn: () => getMyJob(jobId!),
  });

  const [updateMode, setUpdateMode] = useState(false);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError || !data?.job) return <p>No data</p>;

  // const job: Job = !isLoading && !isError ? data.job : {};
  const job: Job = data.job;
  console.log(job);

  const workTimeView = () => {
    switch (job.work_time) {
      case "full_time":
        return "Full-Time";
      case "part_time":
        return "Part-Time";
      case "contract":
        return "Contract";
      case "internship":
        return "Internship";
      default:
        return "No data";
    }
  };

  return (
    <div>
      {job ? (
        <div className="w-full">
          <span>
            <h1>Title: </h1>
            {updateMode ? (
              <input
                type="text"
                value={job.title}
                className="w-full"
                disabled={!updateMode}
              />
            ) : (
              job.title
            )}
          </span>
          <span className="w-full">
            <p>Position:</p>
            <input
              type="text"
              value={job.position}
              className="w-full"
              disabled={!updateMode}
            />
          </span>

          <span>
            <p>Location:</p>
            <input
              type="text"
              value={job.location}
              className="w-full"
              disabled={!updateMode}
            />
          </span>
          <span>
            <p>Salary:</p>
            {updateMode ? (
              <>
                {/* make logic splitting salary string into numbers from '$' to '-' and from '-' to '/' and salary type after '/' */}
                <p>Min salary: </p>
                <input
                  type="number"
                  value={job.salary}
                  className="w-full"
                  disabled={!updateMode}
                />

                <p>Max salary: </p>
                <input
                  type="number"
                  value={job.salary}
                  className="w-full"
                  disabled={!updateMode}
                />

                <p>Salary type: </p>
                <input
                  type="text"
                  value={job.salary}
                  className="w-full"
                  disabled={!updateMode}
                />
              </>
            ) : (
              <p>{job.salary}</p>
            )}
          </span>
          <span>
            <p>Job type:</p>
            <input
              type="text"
              // value={job.work_time}
              value={workTimeView()}
              className="w-full"
              disabled={!updateMode}
            />
          </span>
          <span>
            <p>Education:</p>{" "}
            {updateMode ? (
              <input
                type="text"
                value={job.education || ""}
                className="w-full"
                disabled={!updateMode}
              />
            ) : (
              job.education ?? "No education"
            )}
          </span>
          <span>
            <p>Experience:</p>{" "}
            {updateMode ? (
              <input
                type="text"
                value={job.experience || ""}
                className="w-full"
                disabled={!updateMode}
              />
            ) : (
              job.experience ?? "No experience"
            )}
          </span>

          {/* <hr /> */}

          <div className="">
            <h3>Description: </h3>
            {updateMode ? (
              <textarea
                value={job.description || ""}
                className="w-full"
                disabled={!updateMode}
              />
            ) : (
              <article>{job.description ?? "No descripton"}</article>
            )}
          </div>
          <div className="">
            <h3>Responsobilities: </h3>
            {updateMode ? (
              <textarea
                value={job.responsobilities || ""}
                className="w-full"
                disabled={!updateMode}
              />
            ) : (
              <article>{job.responsobilities ?? "No responsobilities"}</article>
            )}
          </div>

          <button
            type="button"
            className="cursor-pointer"
            onClick={() => setUpdateMode(!updateMode)}
          >
            {updateMode ? "Done" : "Update"}
          </button>
        </div>
      ) : (
        <p>No data</p>
      )}
    </div>
  );
};

export default Job;
