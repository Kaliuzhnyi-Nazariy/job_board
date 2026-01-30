// import type { IJobList } from "./JobComponent";
import JobCard from "./JobCard";
import { useQuery } from "@tanstack/react-query";
import { getJobs } from "../../../../features/job/jobRequests";
import { Link, useSearchParams } from "react-router";
import Section from "../../Section";
import { Pagination } from "@mui/material";

const JobList = ({
  listView,
  jobSortingType,
}: {
  listView: "grid" | "list";
  jobSortingType: "oldest" | "newest";
}) => {
  const listStyles = "flex flex-col gap-y-6";

  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || (12 as 12 | 16);
  const order = searchParams.get("order") || "newest";
  const title = searchParams.get("title") || null;
  const location = searchParams.get("location") || null;

  const gridStyles = `grid  ${
    limit === 12
      ? "grid-cols-3 gap-x-6 gap-y-6.5"
      : "grid-cols-4 gap-x-3 gap-y-3.5"
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

  const pageAmount = Math.ceil(data.meta.total / data.meta.limit);

  return (
    <>
      {data?.jobs?.length > 0 && (
        <Section>
          <ul className={`${listView === "grid" ? gridStyles : listStyles} `}>
            {orderedJobs.map((job) => {
              return (
                <li className="h-51" key={job.id}>
                  <Link
                    to={`/candidate/find-job/${job.id}`}
                    key={job.id}
                    className="h-full"
                  >
                    <JobCard job={job}></JobCard>
                  </Link>
                </li>
              );
            })}
          </ul>

          <Pagination
            className="justify-center w-full grid mt-12"
            count={pageAmount}
            page={page}
            onChange={(_, newPage) => {
              setSearchParams((prev) => {
                const params = new URLSearchParams(prev);
                params.set("page", String(newPage));
                return params;
              });
            }}
            sx={{
              "& .Mui-disabled": {
                color: "#99C2FF",
                bgcolor: "transparent",
              },
              "& .css-1l5xwdx-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected":
                {
                  bgcolor: "#0a65cc",
                  backgroundColor: "#0a65cc",
                  color: "white",
                },
              "& .MuiPaginationItem-previousNext": {
                bgcolor: "#e7f0fa",
                color: "#0a65cc",
              },
            }}
          />
        </Section>
      )}
    </>
  );
};

export default JobList;
