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
    <div className="grid grid-cols-2 max-[1023px]:w-full min-[1024px]:flex gap-2">
      {jobTitle && (
        <span
          className="flex items-center justify-between min-[1024
        px]:gap-3 pl-4 py-1.5 pr-1.5 rounded-full bg-(--gray50) body_smal h-8"
        >
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
            className="size-5 rounded-full bg-white text-(--gray5) text-center flex justify-center items-center"
          >
            x
          </button>
        </span>
      )}
      {jobLocation && (
        <span
          className="flex items-center justify-between min-[1024
        px]:gap-3 pl-4 py-1.5 pr-1.5 rounded-full bg-(--gray50) body_smal h-8"
        >
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
            className="size-5 rounded-full bg-white text-(--gray5) text-center flex justify-center items-center"
          >
            x
          </button>
        </span>
      )}
    </div>
  );
};

export default JobFilter;
