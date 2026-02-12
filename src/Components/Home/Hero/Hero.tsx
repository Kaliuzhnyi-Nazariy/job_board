import { useNavigate } from "react-router";
import Section from "../../Section";
import { useSelector } from "react-redux";
import { userRole } from "../../../../features/user/userSelector";
import LinkItem from "./LinkItem";
import InfoItem from "./InfoItem";

import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import Searchbar from "./Searchbar";

const Hero = () => {
  const navigate = useNavigate();

  const role = useSelector(userRole);

  const handleRedirect = (request: string) => {
    if (role === "employer") {
      navigate("/employer/candidates?search=" + request);
    } else {
      navigate("/candidate/find-job?title=" + request);
    }
  };

  return (
    <Section extraStyles="bg-[#F1F2F4] py-25 grid grid-cols-auto grid-rows-[1fr_auto] gap-x-[149px] gap-y-10">
      <div className="">
        <div className="w-163">
          <h1>Find a job that suits your interest & skills.</h1>
          <p className="body_large_400 text-(--gray6) mt-6">
            Aliquam vitae turpis in diam convallis finibus in at risus. Nullam
            in scelerisque leo, eget sollicitudin velit bestibulum.
          </p>
        </div>
        {/* change on searchbar */}
        {/* <div className="w-169.75 h-20 bg-white mt-8"></div> */}
        <Searchbar />

        <div className="text-(--gray7) body_small flex mt-6">
          <p>Suggestion: </p>
          <ul className="flex w-full gap-1">
            <LinkItem value="Design" handleRedirect={handleRedirect} />
            <LinkItem value="Programming" handleRedirect={handleRedirect} />
            <LinkItem
              value="Digital Marketing"
              handleRedirect={handleRedirect}
            />
            <LinkItem value="Video" handleRedirect={handleRedirect} />
            <LinkItem value="Animation" handleRedirect={handleRedirect} />
          </ul>
        </div>
      </div>
      <img src="hero_illustration.png" alt="working person" />

      {/* <ul className="flex gap-6 mt-10"> */}
      <ul className="flex gap-6 col-start-1 col-end-3">
        <InfoItem
          icon={
            <WorkOutlineOutlinedIcon className="size-10 text-(--primary5)" />
          }
          amount="1,75,324"
          label="Live Job"
        />
        <InfoItem
          icon={<BusinessOutlinedIcon className="size-10 text-(--primary5)" />}
          amount="97,354"
          label="Companies"
        />
        <InfoItem
          icon={
            <PeopleOutlineOutlinedIcon className="size-10 text-(--primary5)" />
          }
          amount="38,47,154"
          label="Candidates"
        />{" "}
        <InfoItem
          icon={
            <WorkOutlineOutlinedIcon className="size-10 text-(--primary5)" />
          }
          amount="7,532"
          label="New Jobs"
        />
      </ul>
    </Section>
  );
};

export default Hero;
