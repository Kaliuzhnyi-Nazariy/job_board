import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getCandidate } from "../../../../features/candidate/candidatesRequsts";
import type { FullDataCandidate } from "../../../../features/candidate/interfaces";
// import { dateFormat } from "../../../helpers";
import Section from "../../../Components/Section";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import GeneralData from "../../../Components/Candidate/GeneralData";
import ContactData from "../../../Components/Candidate/ContactData";
import LinkButton from "../../../Components/LinkButton";

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
    <Section>
      {isLoading && <p>Loading...</p>}
      {data ? (
        <>
          <div className="flex flex-col min-[1024px]:flex-row justify-between pt-12 pb-10">
            <div className="flex gap-6 items-center">
              <div className="size-20 rounded-full bg-(--gray5)"></div>
              <div className="">
                <h2>{data.full_name}</h2>
                <small className="opacity-50">{data.speciality}</small>
              </div>
            </div>
            <div className="flex flex-col min-[1024px]:flex-row gap-3 items-center max-[1023px]:w-full mt-3 min-[1024px]:mt-0">
              <LinkButton
                link={`mailto:${data.email}`}
                type="outlined"
                extraStyles=" max-[1023px]:w-full text-center"
              >
                <EmailOutlinedIcon />
                <span>Send email</span>
              </LinkButton>

              <button className="border border-transparent bg-(--primary5) text-white button flex gap-3 items-center px-6 py-3 rounded-sm h-12 cursor-pointer hover:bg-(--primary6) transition-colors duration-150 max-[1023px]:w-full justify-center">
                <ArrowCircleRightOutlinedIcon />
                <span>Hire Candidate</span>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3 min-[1440px]:grid-cols-[2fr_1fr] min-[1440px]:gap-18">
            <div className="">
              <h4 className="uppercase text-lg font-medium">Biography</h4>
              <article className="mt-6 body_medimum text-(--gray6)">
                {data.biography || "no bio"}
              </article>
            </div>
            <div className="flex flex-col gap-6 min-[640px]:gap-3 min-[640px]:grid min-[640px]:grid-cols-2 min-[1920px]:gap-6">
              <GeneralData
                date_of_birth={data.date_of_birth}
                gender={data.gender}
                experience={data.experience}
                education={data.education}
              />

              <ContactData
                website={data.website}
                location={data.location}
                phone={data.phone}
                email={data.email}
              />
            </div>
          </div>
        </>
      ) : (
        <p>No data</p>
      )}
    </Section>
  );
};

export default Candidate;
