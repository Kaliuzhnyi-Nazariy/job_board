import { useParams } from "react-router";

const Job = () => {
  const { jobId } = useParams();

  return <div>Job id: {jobId}</div>;
};

export default Job;
