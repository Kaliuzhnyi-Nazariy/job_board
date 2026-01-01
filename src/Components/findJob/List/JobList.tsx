import type { IJobList } from "./JobComponent";
import JobCard from "./JobCard";

const JobList = ({
  jobNumber,
  listView,
  jobSortingType,
}: {
  jobNumber: 12 | 16;
  listView: "grid" | "list";
  jobSortingType: "oldest" | "newest";
}) => {
  const gridStyles = `grid ${jobNumber === 12 ? "grid-cols-3" : "grid-cols-4"}`;
  const listStyles = "flex flex-col";

  const jobList: IJobList[] = [
    {
      title: "Dribble",
      location: "California",
      position: "Sunior UX Designer.",
      salary: "$50k-80k/month",
      workTime: "full_time",
      createdAt: 1519129853500,
    },
    {
      title: "Reddit",
      location: "United Kingdom of Great Britain",
      position: "Marketing Officer",
      salary: "$30K-$35K",
      workTime: "full_time",
      createdAt: 1519129858900,
    },
    {
      title: "Freepik",
      location: "China",
      position: "Visual Designer",
      salary: "$10K-$15K",
      workTime: "part_time",
      createdAt: 1519129864400,
    },
  ];

  const orderedJobs = [...jobList].sort((a, b) => {
    if (jobSortingType === "oldest") {
      return a.createdAt - b.createdAt;
    }
    return b.createdAt - a.createdAt;
  });

  return (
    <>
      {jobList.length > 0 && (
        <ul className={`${listView === "grid" ? gridStyles : listStyles}`}>
          {orderedJobs.map((job, index) => {
            return (
              <li key={index}>
                <JobCard job={job}></JobCard>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default JobList;
