import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DashboardCandidateLinks from "../../pages/candidate/DashboardCandidateLinks";
import DashboardEmployerLinks from "../../pages/employer/DashboardEmployerLinks";

const MobMenuDashboardAccordion = ({
  onClick,
  role,
}: {
  onClick: () => void;
  role: "employer" | "candidate";
}) => {
  return (
    <Accordion sx={{ boxShadow: "none" }}>
      <AccordionSummary
        expandIcon={<ArrowDropDownIcon />}
        aria-controls="panel2-content"
        id="panel2-header"
        sx={{
          padding: 0,
        }}
      >
        <Typography component="span">
          {role === "candidate" ? "Candidate" : "Employer"} dashboard
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {/* ul>li* */}
        {role === "candidate" ? (
          <DashboardCandidateLinks onClick={onClick} />
        ) : (
          <DashboardEmployerLinks onClick={onClick} />
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default MobMenuDashboardAccordion;
