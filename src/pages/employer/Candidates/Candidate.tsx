import { useParams } from "react-router";

const Candidate = () => {
  const { candidateId } = useParams();

  return <div>Candidate #{candidateId || "null"}</div>;
};

export default Candidate;
