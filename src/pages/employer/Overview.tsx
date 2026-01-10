import { useSelector } from "react-redux";
import { username } from "../../../features/user/userSelector";
import { useQuery } from "@tanstack/react-query";
import { getMyJobs } from "../../../features/job/jobRequests";

const Overview = () => {
  const usernameValue = useSelector(username);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["myjobs"],
    queryFn: getMyJobs,
  });

  return (
    <div>
      <h1>Hello, {usernameValue}</h1>
      <span>
        <p>
          {isError
            ? "Error ocured!"
            : isLoading
            ? "Loading"
            : `${data.job.length} jobs`}
        </p>
      </span>
      <span>
        <p>2, 517 saved candidates</p>
      </span>
    </div>
  );
};

export default Overview;
