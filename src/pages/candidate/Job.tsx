import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getJob } from "../../../features/job/jobRequests";
import ApplyModal from "../../Components/modals/ApplyModal";
import React from "react";
import Section from "../../Components/Section";
import WorkTimeBadge from "../../Components/WorkTimeBadge";
import { dateFormat, workTimeFormat } from "../../helpers";

import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import WalletOutlinedIcon from "@mui/icons-material/WalletOutlined";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const Job = () => {
  const { jobId } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["job", jobId],
    queryFn: () => getJob(jobId!),
  });

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error ocured!</p>;
  }

  const {
    title,
    work_time,
    description,
    responsibilities,
    education,
    experience,
    location,
    salary,
    created_at,
  } = data.jobs;

  return (
    <Section>
      <div className="flex justify-between py-8">
        <div className="flex items-center gap-2">
          <h5>{title}</h5>
          <WorkTimeBadge jobTime={work_time} />
        </div>
        <button
          type="button"
          onClick={handleOpen}
          className="px-16 py-4 bg-(--primary5) button text-white rounded-sm flex gap-3 items-center cursor-pointer hover:bg-(--primary6) transition-colors duration-150"
        >
          Apply now <ArrowRightAltIcon />
        </button>
      </div>
      {/* <div className="flex gap-12.5"> */}
      <div className="grid grid-cols-[55%_45%] gap-12.5">
        <div className="w-full">
          <h6 className="body_large">Job Description</h6>
          <article className="mt-4 text-(--gray6)">
            {description || "No description"}
          </article>

          <p className="mt-8 body_large">Responsibilities</p>
          <article className="mt-4 text-(--gray6)">
            {responsibilities || "No responsibilities"}
          </article>
        </div>
        <div className="w-full border border-(--primary50) rounded-lg p-8 max-w-134">
          <p className="body_large ">Job overview</p>
          <ul className="grid grid-cols-3 mt-6 gap-y-6">
            <li className="flex flex-col gap-4">
              <CalendarTodayOutlinedIcon
                className="size-8"
                sx={{ fill: "var(--primary5)" }}
              />
              <div className="">
                <span className="text-[12px] text-(--gray5) uppercase">
                  JOB POSTED:
                </span>
                <p className="body_small_500">
                  {dateFormat(created_at, "dateOfBirth")}
                </p>
              </div>
            </li>
            <li className="flex flex-col gap-4">
              <WorkOutlineOutlinedIcon
                className="size-8"
                sx={{ fill: "var(--primary5)" }}
              />
              <div className="">
                <span className="text-[12px] text-(--gray5) uppercase">
                  EDUCATION:
                </span>
                <p className="body_small_500">{education}</p>
              </div>
            </li>
            <li className="flex flex-col gap-4">
              <WalletOutlinedIcon
                className="size-8"
                sx={{ fill: "var(--primary5)" }}
              />
              <div className="">
                <span className="text-[12px] text-(--gray5) uppercase">
                  SALARY:
                </span>
                <p className="body_small_500">{salary}</p>
              </div>
            </li>
            <li className="flex flex-col gap-4">
              <LocationOnIcon
                className="size-8"
                sx={{ fill: "var(--primary5)" }}
              />
              <div className="">
                <span className="text-[12px] text-(--gray5) uppercase">
                  Location:
                </span>
                <p className="body_small_500">{location}</p>
              </div>
            </li>
            <li className="flex flex-col gap-4">
              <WorkOutlineOutlinedIcon
                className="size-8"
                sx={{ fill: "var(--primary5)" }}
              />
              <div className="">
                <span className="text-[12px] text-(--gray5) uppercase">
                  job type:
                </span>
                <p className="body_small_500">{workTimeFormat(work_time)}</p>
              </div>
            </li>
            <li className="flex flex-col gap-4">
              <WorkOutlineOutlinedIcon
                className="size-8"
                sx={{ fill: "var(--primary5)" }}
              />
              <div className="">
                <span className="text-[12px] text-(--gray5) uppercase">
                  experience:
                </span>
                <p className="body_small_500">{experience}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <ApplyModal
        open={open}
        handleClose={handleClose}
        jobTitle={title}
        jobId={jobId!}
      />
    </Section>
  );
};

export default Job;
