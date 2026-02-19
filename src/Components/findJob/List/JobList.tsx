// import type { IJobList } from "./JobComponent";
import JobCard from "./JobCard";
import { useQuery } from "@tanstack/react-query";
import { getJobs } from "../../../../features/job/jobRequests";
import { Link, useSearchParams } from "react-router";
import Section from "../../Section";
import PaginationComponent from "../../Pagination";
import type { IJobList } from "./JobComponent";

const JobList = () => {
  const listStyles = "flex flex-col gap-y-6";

  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || (12 as 12 | 16);
  const order = searchParams.get("order") || "newest";
  const title = searchParams.get("title") || null;
  const location = searchParams.get("location") || null;
  const listView = searchParams.get("list-view") || ("grid" as "grid" | "list");

  const gridStyles = `grid grid-cols-1 min-[425px]:grid-cols-2 ${
    limit === 12
      ? "min-[768px]:grid-cols-3 gap-x-6 gap-y-6.5"
      : "min-[768px]:grid-cols-4 gap-x-3 gap-y-3.5"
  }`;

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

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.log(error);
    return <p>failed to get jobs</p>;
  }

  const pageAmount = Math.ceil(data.meta.total / data.meta.limit);

  return (
    <>
      {data?.jobs?.length > 0 && (
        <Section>
          <ul className={`${listView === "grid" ? gridStyles : listStyles} `}>
            {data.jobs.map((job: IJobList) => {
              return (
                <li className=" " key={job.id}>
                  <Link
                    to={`/candidate/find-job/${job.id}`}
                    key={job.id}
                    className="h-full"
                  >
                    <JobCard
                      job={job}
                      listView={listView as "grid" | "list"}
                    ></JobCard>
                  </Link>
                </li>
              );
            })}
          </ul>

          <PaginationComponent
            page={page}
            pageAmount={pageAmount}
            setSearchParams={setSearchParams}
          />
        </Section>
      )}
    </>
  );
};

export default JobList;
