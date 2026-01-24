import { useQuery } from "@tanstack/react-query";
import { getCandidates } from "../../../../features/candidate/candidatesRequsts";
import {
  Link,
  useSearchParams,
  // useSearchParams
} from "react-router";

const FindACandidate = () => {
  const [searchParams] = useSearchParams();
  console.log(searchParams.get("search"));

  const search = searchParams.get("search")?.trim() || "";

  // const { data, isLoading, isError } = useQuery({
  //   queryKey: ["candidates", searchParams.get("search")],
  //   queryFn: () => getCandidates(searchParams.get("search") as string),
  // });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["candidates", search],
    queryFn: () => getCandidates(search),
  });

  console.log({ data });

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
                    <h3>{c.full_name}</h3>
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
