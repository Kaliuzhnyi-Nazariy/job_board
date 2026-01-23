import { useSelector } from "react-redux";
import { username } from "../../../features/user/userSelector";
import { useQuery } from "@tanstack/react-query";
import { getCandidateApplications } from "../../../features/application/applicationRequest";
import { Link } from "react-router";

const Overview = () => {
  const usernameValue = useSelector(username);

  const { data, isLoading } = useQuery({
    queryKey: ["getMyApplications"],
    queryFn: getCandidateApplications,
  });

  return (
    <div>
      <h1>Hello, {usernameValue}</h1>
      <small>Here is your daily activities and job alerts</small>
      <Link
        to={`applied-jobs`}
        className="w-78 h-26 bg-(--primary50) px-6 py-5 rounded-lg flex gap-6 justify-between cursor-pointer"
      >
        <div className="">
          <p className="font-semibold text-2xl">
            {isLoading ? "Loading..." : data?.length}
          </p>
          <p className="body_small">Applied jobs</p>
        </div>
        <div className="size-16 bg-white rounded-[5px] p-4">
          <div className="size-8 bg-(--primary5)"></div>
        </div>
      </Link>
    </div>
  );
};

export default Overview;
