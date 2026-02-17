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
    // <Section extraStyles="bg-[#F1F2F4] py-25 grid grid-cols-auto grid-rows-[1fr_auto] min-[1920px]:gap-x-[149px] gap-y-10">
    <Section extraStyles="bg-[#F1F2F4] py-5 min-[1440px]:py-25 grid grid-rows-auto grid-cols-auto min-[1024px]:grid-rows-[1fr_auto] min-[1920px]:gap-x-[149px] gap-y-3  min-[768px]:gap-y-10">
      <div className="row-start-2 min-[1440px]:row-start-1">
        <div className=" min-[1024px]:w-140  min-[1024px]:mx-auto min-[1440px]:mx-0 min-[1920px]:w-163">
          <h1 className="text-center min-[1440px]:text-start">
            Find a job that suits your interest & skills.
          </h1>
          <p className="body_large_400 text-(--gray6) mt-6 text-center min-[1440px]:text-start">
            Aliquam vitae turpis in diam convallis finibus in at risus. Nullam
            in scelerisque leo, eget sollicitudin velit bestibulum.
          </p>
        </div>
        <Searchbar />

        <div className="text-(--gray7) body_small flex flex-col min-[768px]:flex-row mt-6 justify-center min-[1440px]:justify-start">
          <p className="text-center min-[768px]:text-start">Suggestion: </p>
          <ul className="grid grid-cols-2 gap-3 mt-3 min-[768px]:mt-0 min-[768px]:flex min-[768px]:gap-1">
            <LinkItem value="Design," handleRedirect={handleRedirect} />
            <LinkItem value="Programming," handleRedirect={handleRedirect} />
            <LinkItem
              value="Digital Marketing,"
              handleRedirect={handleRedirect}
            />
            <LinkItem value="Video," handleRedirect={handleRedirect} />
            <LinkItem value="Animation" handleRedirect={handleRedirect} />
          </ul>
        </div>
      </div>
      <img
        src="hero_illustration.png"
        alt="working person"
        className="2xl:justify-self-end min-[768px]:w-123 mx-auto row-1"
      />

      {/* <ul className="flex gap-6 mt-10"> */}
      {/* <ul className="flex gap-6 col-start-1 col-end-3"> */}
      <ul className="w-full grid min-[768px]:grid-cols-2 justify-center gap-3 min-[1440px]:flex min-[1440px]:justify-between min-[1440px]:col-start-1 min-[1440px]:col-end-3">
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
