import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router";
import { getCandidate } from "../../../../features/candidate/candidatesRequsts";
import type { FullDataCandidate } from "../../../../features/candidate/interfaces";
import { dateFormat } from "../../../helpers";

const Candidate = () => {
  const { candidateId } = useParams();

  const { data, isLoading, isError } = useQuery<FullDataCandidate>({
    queryKey: ["candidate", candidateId],
    queryFn: () => getCandidate(candidateId!),
  });

  if (isError) {
    return <p>Error occured!</p>;
  }

  if (!isLoading && data && data.data) {
    console.log(data);
  }

  return (
    <div>
      <h1>Candidate #{candidateId || "null"}</h1>
      {isLoading && <p>Loading...</p>}
      {data ? (
        <>
          <div className="flex justify-between">
            <div className="">
              <h2>{data.full_name}</h2>
              <small className="opacity-50">{data.speciality}</small>
            </div>
            <div className="flex gap-3">
              <button className="size-12 bg-blue-500/40"></button>
              <Link
                to={`mailto:${data.email}`}
                className="border border-blue-500/40"
              >
                Send email
              </Link>
              <button className="border border-transparent bg-blue-500">
                Hire Candidate
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-18">
            <div className="">
              <h4>Biography</h4>
              <article>{data.biography || "no bio"}</article>
            </div>
            <div className="">
              <div className="grid grid-cols-2">
                <div className="">
                  <p>DATE OF BIRTH</p>
                  <p>
                    {dateFormat(data.date_of_birth, "dateOfBirth") || "no data"}
                  </p>
                </div>
                <div className="">
                  <p>GENDER</p>
                  <p>{data.gender || "no data"}</p>
                </div>
                <div className="">
                  <p>Experience</p>
                  <p>{data.experience || "no data"}</p>
                </div>
                <div className="">
                  <p>Education</p>
                  <p>{data.education || "no data"}</p>
                </div>
              </div>
            </div>
            <div className="">
              <h4>Contact Information</h4>
              <div className="">
                <p>Website</p>
                {data.website ? (
                  <Link to={data.website} target="_blank">
                    {data.website}
                  </Link>
                ) : (
                  <p>no data</p>
                )}
              </div>
              <div className="">
                <p>Loaction</p>
                <p>{data.location || "no data"}</p>
              </div>
              <div className="">
                <p>Phone</p>
                {data.phone ? (
                  <Link to={`tel:` + data.phone}>{data.phone}</Link>
                ) : (
                  <p>no data</p>
                )}
              </div>
              <div className="">
                <p>Email address</p>
                <Link to={`mailto:` + data.email}>{data.email}</Link>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>No data</p>
      )}
    </div>
  );
};

export default Candidate;
