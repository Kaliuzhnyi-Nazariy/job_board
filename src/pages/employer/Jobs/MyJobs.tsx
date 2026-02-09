import { useQuery } from "@tanstack/react-query";
import { getMyJobs } from "../../../../features/job/jobRequests";
// import JobCard from "./JobCard";
// import type { IJob } from "../../../../features/job/interfaces";
import DashboardSection from "../../../Components/Dashboard/DashboardSection";
// import OverviewRecentJobsList from "../../../Components/JobsListComponent";
import { useSearchParams } from "react-router";
// import { Pagination } from "@mui/material";
import { useEffect } from "react";
import JobsListComponent from "../../../Components/JobsListComponent";
import PaginationComponent from "../../../Components/Pagination";

const MyJobs = () => {
  const [searchParams, setSearchParams] = useSearchParams({ page: "1" });

  useEffect(() => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("page", String(1));
      return params;
    });
  }, []);

  const page = Number(searchParams.get("page")) || 1;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["myjobs", page],
    queryFn: () => getMyJobs(page!),
    retry: false,
  });

  if (isLoading && !isError) {
    return <p>Loading...</p>;
  }

  console.log("data in my jobs: ", { data });

  const pageAmount = Math.ceil(data.meta.allAmountOfJobs / data.meta.limit);
  // const pageAmount = Math.ceil(data.allAmountOfJobs / 10);

  // console.log(pageAmount);

  // in the future I will add ststuse and filter on that page

  return (
    <DashboardSection>
      {/* <div className="flex justify-between"> */}
      <div className="flex">
        <h1 className="body_large_500">
          My Jobs{" "}
          <span className="text-(--gray4)">
            ({data.job ? data.meta.allAmountOfJobs : 0})
          </span>
        </h1>{" "}
      </div>
      <JobsListComponent
        loadingRecentJobs={isLoading}
        recentJobs={data.job}
        title=""
        isLink={false}
      />

      <PaginationComponent
        page={page}
        pageAmount={pageAmount}
        setSearchParams={setSearchParams}
      />
    </DashboardSection>
  );
};

export default MyJobs;
