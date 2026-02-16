import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import type { JobApplicatinon } from "../../../../features/application/interfaces";
import ApplicationCard from "./ApplicationCard";

const ListOfApplicationsMob = ({
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
  return (
    <div className="min-[1024px]:hidden">
      <Accordion sx={{ backgroundColor: "#f1f2f4" }} defaultExpanded>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography component="span" className="body_small_400">
            All application ({data.length})
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
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
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ backgroundColor: "#f1f2f4" }}>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography component="span" className="body_small_400">
            Applied ({candidateList.length})
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
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
        </AccordionDetails>
      </Accordion>

      <Accordion sx={{ backgroundColor: "#f1f2f4" }}>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography component="span" className="body_small_400">
            Submitted ({submittedCandidates.length})
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
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
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default ListOfApplicationsMob;
