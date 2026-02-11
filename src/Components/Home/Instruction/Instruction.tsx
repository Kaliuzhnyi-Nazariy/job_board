import Section from "../../Section";
import StepItem from "./StepItem";

import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import ZoomInOutlinedIcon from "@mui/icons-material/ZoomInOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";

const Instruction = () => {
  return (
    <Section extraStyles="py-25 text-center bg-(--gray50)">
      <h1>How jobpilot work</h1>
      <ul className="mt-12.5 flex gap-6">
        <StepItem
          icon={
            <PersonAddAltOutlinedIcon className="text-8 text-(--primary5) group-hover:text-white " />
          }
          text="Aliquam facilisis egestas sapien, nec tempor leo tristique at."
          title="Create account"
        />

        <StepItem
          icon={
            <CloudUploadOutlinedIcon className="text-8 text-(--primary5) group-hover:text-white " />
          }
          text="Curabitur sit amet maximus ligula. Nam a nulla ante. Nam sodales"
          title="Upload CV/Resume"
        />

        <StepItem
          icon={
            <ZoomInOutlinedIcon className="text-8 text-(--primary5) group-hover:text-white " />
          }
          text="Phasellus quis eleifend ex. Morbi nec fringilla nibh."
          title="Find suitable job"
        />

        <StepItem
          icon={
            <VerifiedOutlinedIcon className="text-8 text-(--primary5) group-hover:text-white " />
          }
          text="Curabitur sit amet maximus ligula. Nam a nulla ante, Nam sodales purus."
          title="Apply job"
        />
      </ul>
    </Section>
  );
};

export default Instruction;
