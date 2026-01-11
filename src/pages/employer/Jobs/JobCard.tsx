import React from "react";
import type { IJob } from "../../../../features/job/interfaces";
import { Link } from "react-router";

const JobCard = ({ data }: { data: IJob }) => {
  return (
    <Link
      to={`/employer/dashboard/my-jobs/${data.id}`}
      className="flex p-5 justify-between w-full"
    >
      <div className="">
        <h2>{data.title}</h2>
        <p className="opacity-50">{data.work_time}</p>
      </div>

      <div className="">.</div>
    </Link>
  );
};

export default JobCard;
