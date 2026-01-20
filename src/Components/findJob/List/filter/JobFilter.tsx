import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { getJobs } from "../../../../../features/job/jobRequests";

const JobFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const queryClient = useQueryClient();

  const page = Number(searchParams.get("page")) || 1;
  const limit = (Number(searchParams.get("limit")) || 12) as 12 | 16;
  const order = (searchParams.get("order") || "newest") as "oldest" | "newest";
  const jobTitle = searchParams.get("title");
  const jobLocation = searchParams.get("location");

  const { refetch } = useQuery({
    queryKey: ["jobs", page, limit, order, jobTitle, jobLocation],
    queryFn: () =>
      getJobs({
        page,
        limit,
        order,
        title: jobTitle,
        location: jobLocation,
      }),
  });

  return (
    <div className="flex gap-2">
      {jobTitle && (
        <span className="flex gap-1 py-1 px-2 rounded-full bg-gray-400">
          <p>{jobTitle}</p>
          <button
            onClick={async () => {
              setSearchParams((prev) => {
                const params = new URLSearchParams(prev);
                params.delete("title");
                return params;
              });

              refetch();
              queryClient.invalidateQueries({ queryKey: ["jobs"] });
            }}
          >
            x
          </button>
        </span>
      )}
      {jobLocation && (
        <span className="flex gap-1 py-1 px-2 rounded-full bg-gray-400">
          <p>{jobLocation}</p>
          <button
            onClick={async () => {
              setSearchParams((prev) => {
                const params = new URLSearchParams(prev);
                params.delete("location");
                return params;
              });
              refetch();
              queryClient.invalidateQueries({ queryKey: ["jobs"] });
            }}
          >
            x
          </button>
        </span>
      )}
    </div>
  );
};

export default JobFilter;
