import { useSelector } from "react-redux";
import { userId } from "../../../features/user/userSelector";
import { useQuery } from "@tanstack/react-query";
import { getCandidateApplications } from "../../../features/application/applicationRequest";
import { useState } from "react";
import ApplicationDetails from "../../Components/modals/ApplicationDetails";

const Applied = () => {
  const [openModal, setModalOpen] = useState(false);
  const [applicationId, setApplicationId] = useState<string | null>(null);

  const handleOpen = (jobId: string) => {
    setModalOpen(true);
    setApplicationId(jobId);
  };
  const handleClose = () => {
    setModalOpen(false);
    setApplicationId(null);
  };

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

  // make a model which is going to be opened after clicking view details button, the request to get data is already exist

  return (
    <div className="w-full">
      <h2>
        Applied Jobs
        <span className="opacity-50"> ({data ? data.length : 0})</span>
      </h2>
      {data && data.length > 0 ? (
        <ul className="w-full">
          {data.map((aj) => {
            return (
              <li
                key={aj.id}
                className="flex justify-between items-center w-full p-5"
              >
                <div className="">
                  <div className="flex gap-2">
                    <h2>{aj.title}</h2>
                    <span>{aj.work_time}</span>
                  </div>
                  <div className="flex">
                    <p>{aj.location}</p>
                    <p>{aj.salary}</p>
                  </div>
                </div>

                <p>{JSON.stringify(aj.applied_at)}</p>
                <p>{aj.status}</p>

                <button onClick={() => handleOpen(aj.id)}>View Details</button>
              </li>
            );
          })}
        </ul>
      ) : (
        "You haven't applied yet!"
      )}
      <ApplicationDetails
        open={openModal}
        handleClose={handleClose}
        applicationId={applicationId!}
      />
    </div>
  );
};

export default Applied;
