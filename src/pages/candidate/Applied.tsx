import { useSelector } from "react-redux";
import { userId } from "../../../features/user/userSelector";
import { useQuery } from "@tanstack/react-query";
import { getCandidateApplications } from "../../../features/application/applicationRequest";

const Applied = () => {
  const userIdValue = useSelector(userId);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["getMyApplications", userIdValue],
    queryFn: getCandidateApplications,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error ocurred!</p>;
  }

  return (
    <div>
      <h2>Applied</h2>
      {data && data.length > 0 ? (
        <ul>
          {data.map((aj) => {
            return (
              <li key={aj.id}>
                <h2>{aj.title}</h2>
              </li>
            );
          })}
        </ul>
      ) : (
        "You haven't applied yet!"
      )}
    </div>
  );
};

export default Applied;
