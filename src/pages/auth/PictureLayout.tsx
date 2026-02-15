// import { Outlet } from "react-router";

import WorkIcon from "@mui/icons-material/Work";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";

const PictureLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-[1440px]:grid min-[1440px]:grid-cols-2 w-full h-screen justify-between">
      {children}

      <div className="hidden min-[1440px]:block relative h-full  ">
        <div className="absolute w-full h-full bg-linear-[0deg,#041A3C_1%,#041a3c7c_100%,transparent] select-none"></div>
        <img
          src="/public/checkered_flag.jpg"
          alt="checkered flag"
          className="h-full w-full object-none object-center select-none"
        />
        <div className="absolute inset-y-0 -left-11.75 w-20 bg-white -skew-x-5 select-none"></div>

        <div className="absolute bottom-28.5 left-34.5 text-white flex flex-col gap-12.5">
          <p>Over 1,75,324 candidates waiting for good employees.</p>

          <ul className="flex gap-2.5">
            <li className="flex flex-col gap-6 w-45 h-36">
              <div className="size-16 bg-white/10 rounded-lg flex items-center justify-center">
                <WorkIcon className="text-8" />
              </div>
              <span>
                <p>1,75,324</p>
                <p>Live Job</p>
              </span>
            </li>
            <li className="flex flex-col gap-6 w-45 h-36">
              <div className="size-16 bg-white/10 rounded-lg flex items-center justify-center">
                <BusinessOutlinedIcon className="text-8" />
              </div>
              <span>
                <p>1,75,324</p>
                <p>Employers</p>
              </span>
            </li>
            <li className="flex flex-col gap-6 w-45 h-36">
              <div className="size-16 bg-white/10 rounded-lg flex items-center justify-center">
                <WorkIcon className="text-8" />
              </div>
              <span>
                <p>1,75,324</p>
                <p>New Jobs</p>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PictureLayout;
