// import type { IJobList } from "./JobComponent";
import JobCard from "./JobCard";
import { useQuery } from "@tanstack/react-query";
import { getJobs } from "../../../../features/job/jobRequests";
import { Link, useSearchParams } from "react-router";

const JobList = ({
  listView,
  jobSortingType,
}: {
  listView: "grid" | "list";
  jobSortingType: "oldest" | "newest";
}) => {
  const listStyles = "flex flex-col";

  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || (12 as 12 | 16);
  const order = searchParams.get("order") || "newest";
  const title = searchParams.get("title") || null;
  const location = searchParams.get("location") || null;

  const gridStyles = `grid ${limit === 12 ? "grid-cols-3" : "grid-cols-4"}`;

  const { data, isLoading, error } = useQuery({
    queryKey: ["jobs", page, limit, order, title, location],
    queryFn: () =>
      getJobs({
        page: page,
        limit: limit as 12 | 16,
        order: order as "newest" | "oldest",
        title,
        location,
      }),
  });

  const orderedJobs = data
    ? [...data.jobs].sort((a, b) => {
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
      {data?.jobs?.length > 0 && (
        <>
          <ul className={`${listView === "grid" ? gridStyles : listStyles}`}>
            {orderedJobs.map((job) => {
              return (
                <li>
                  <Link to={`/candidate/find-job/${job.id}`} key={job.id}>
                    <JobCard job={job}></JobCard>
                  </Link>
                </li>
                // <li key={job.id}>
                //   <JobCard job={job}></JobCard>
                // </li>
              );
            })}
          </ul>
          <ul>
            <li>
              <Link
                to={`?page=${page - 1}&limit=${limit}&order=${jobSortingType}`}
              >
                back
              </Link>
            </li>
            <li>{page}</li>
            <li>
              <Link
                to={`?page=${page + 1}&limit=${limit}&order=${jobSortingType}`}
              >
                forward
              </Link>
            </li>
          </ul>
        </>
      )}
    </>
  );
};

export default JobList;
