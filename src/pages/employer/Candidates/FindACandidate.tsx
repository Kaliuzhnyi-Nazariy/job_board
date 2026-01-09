import { useQuery } from "@tanstack/react-query";
import { getCandidates } from "../../../../features/candidate/candidatesRequsts";
import {
  Link,
  // useSearchParams
} from "react-router";

const FindACandidate = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["candidates"],
    queryFn: getCandidates,
  });

  // const [searchParams, setSearchParams] = useSearchParams();

  if (isLoading) return <p>Searching for candidates</p>;

  if (isError) return <p>Candidates not found!</p>;

  return (
    <div>
      <h1>Find A Candidate</h1>

      <>
        {data && data.length > 0 && (
          <ul>
            {data.map((c) => {
              return (
                <li key={c.id}>
                  <Link to={`/employer/candidates/${c.id}`}>
                    <h3>{c.fullname}</h3>
                    <h4>{c.role}</h4>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </>
    </div>
  );
};

export default FindACandidate;
