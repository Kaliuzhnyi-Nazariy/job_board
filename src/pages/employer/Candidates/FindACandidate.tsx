import { useQuery } from "@tanstack/react-query";
import { getCandidates } from "../../../../features/candidate/candidatesRequsts";
import {
  Link,
  useSearchParams,
  // useSearchParams
} from "react-router";
import { useEffect } from "react";

const FindACandidate = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    return setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("location", "Poland");
      return params;
    });
  }, []);

  const search = searchParams.get("search")?.trim() || "";
  const location = searchParams.get("location")?.trim() || "";

  const { data, isLoading, isError } = useQuery({
    queryKey: ["candidates", search, location],
    queryFn: () => getCandidates(search, location),
  });

  if (isLoading) return <p>Searching for candidates</p>;

  if (isError) return <p>Candidates not found!</p>;

  return (
    <div>
      <h1>Find A Candidate</h1>

      <>
        {data && data.length > 0 ? (
          <ul>
            {data.map((c) => {
              return (
                <li key={c.id}>
                  <Link to={`/employer/candidates/${c.id}`}>
                    <h3>{c.full_name}</h3>
                    <h4>{c.role}</h4>
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>No candidate found!</p>
        )}
      </>
    </div>
  );
};

export default FindACandidate;
