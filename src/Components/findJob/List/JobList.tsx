// import type { IJobList } from "./JobComponent";
import JobCard from "./JobCard";
import { useQuery } from "@tanstack/react-query";
import { getJobs } from "../../../../features/job/jobRequests";

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

  // const jobList: IJobList[] = [
  //   {
  //     title: "Dribble",
  //     location: "California",
  //     position: "Sunior UX Designer.",
  //     salary: "$50k-80k/month",
  //     workTime: "full_time",
  //     createdAt: 1519129853500,
  //   },
  //   {
  //     title: "Reddit",
  //     location: "United Kingdom of Great Britain",
  //     position: "Marketing Officer",
  //     salary: "$30K-$35K",
  //     workTime: "full_time",
  //     createdAt: 1519129858900,
  //   },
  //   {
  //     title: "Freepik",
  //     location: "China",
  //     position: "Visual Designer",
  //     salary: "$10K-$15K",
  //     workTime: "part_time",
  //     createdAt: 1519129864400,
  //   },
  // ];

  const { data, isLoading, error } = useQuery({
    queryKey: ["jobs"],
    queryFn: getJobs,
  });

  console.log(data);

  const orderedJobs = data
    ? [...data].sort((a, b) => {
        const aTime = new Date(a.created_at).getTime();
        const bTime = new Date(b.created_at).getTime();

        if (jobSortingType === "oldest") {
          return aTime - bTime;
        }
        return bTime - aTime;
      })
    : [];

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.log(error);
    return <p>failed to get jobs</p>;
  }

  return (
    <>
      {data?.length > 0 && (
        <ul className={`${listView === "grid" ? gridStyles : listStyles}`}>
          {orderedJobs.map((job) => {
            return (
              <li key={job.id}>
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
