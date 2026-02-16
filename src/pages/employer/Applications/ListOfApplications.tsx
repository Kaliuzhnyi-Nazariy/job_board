import type { JobApplicatinon } from "../../../../features/application/interfaces";
import ApplicationCard from "./ApplicationCard";

const ListOfApplications = ({
  data,
  handleOpen,
  setApplicationId,
  candidateList,
  submittedCandidates,
}: {
  data: JobApplicatinon[];
  handleOpen: () => void;
  setApplicationId: React.Dispatch<React.SetStateAction<string | null>>;
  candidateList: JobApplicatinon[];
  submittedCandidates: JobApplicatinon[];
}) => {
  const listStyle =
    "px-5 py-4 border border-(--gray1) rounded-md bg-(--gray50)";

  return (
    <ul className="hidden min-[1024px]:grid grid-cols-3 mt-6 gap-6">
      <li className={listStyle}>
        <p className="body_small_400">All application ({data.length})</p>
        {data.length > 0 ? (
          <ul className="mt-3 flex flex-col gap-3 max-h-140 overflow-x-hidden overflow-y-auto">
            {data.map((ap) => {
              return (
                <ApplicationCard
                  ap={ap}
                  handleOpen={handleOpen}
                  key={ap.id}
                  setApplicationId={setApplicationId}
                />
              );
            })}
          </ul>
        ) : (
          <p className="text-[10px] min-[425px]:text-[14px] text-(--gray5) ">
            No applications yet!
          </p>
        )}
      </li>
      <li className={listStyle}>
        <ul>
          <p className="body_small_400">Applied ({candidateList.length})</p>
          {candidateList.length > 0 ? (
            <ul className="mt-3 flex flex-col gap-3 max-h-140 overflow-x-hidden overflow-y-auto">
              {candidateList.map((ap) => {
                return (
                  <ApplicationCard
                    ap={ap}
                    handleOpen={handleOpen}
                    key={ap.id}
                    setApplicationId={setApplicationId}
                  />
                );
              })}
            </ul>
          ) : (
            <p className="text-[10px] min-[425px]:text-[14px] text-(--gray5) ">
              No shorten list candidates!
            </p>
          )}
        </ul>
      </li>
      <li className={listStyle}>
        <p className="body_small_400">
          Submitted ({submittedCandidates.length})
        </p>
        {submittedCandidates.length > 0 ? (
          <ul className="mt-3 flex flex-col gap-3 max-h-140 overflow-x-hidden overflow-y-auto">
            {submittedCandidates.map((ap) => {
              return (
                <ApplicationCard
                  ap={ap}
                  handleOpen={handleOpen}
                  key={ap.id}
                  setApplicationId={setApplicationId}
                />
              );
            })}
          </ul>
        ) : (
          <p className="text-[10px] min-[425px]:text-[14px] text-(--gray5) ">
            No hired candidate yet!
          </p>
        )}
      </li>
    </ul>
  );
};

export default ListOfApplications;
