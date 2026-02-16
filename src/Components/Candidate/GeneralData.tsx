import { dateFormat } from "../../helpers";

import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";

const GeneralData = ({
  date_of_birth,
  gender,
  experience,
  education,
}: {
  date_of_birth?: Date;
  gender?: "Mr" | "Ms" | "Mx";
  experience?: string;
  education?: string;
}) => {
  const iconStyle = "text-(--primary5) size-6";
  const titleStyle = "min-[768px]:mt-3 text-[12px] uppercase text-(--gray5)";
  const valueStyle = "mt-1 body_small_500";

  const liItemStyle = "max-[767px]:flex items-center gap-6";

  return (
    <ul className="grid min-[768px]:grid-cols-2 gap-x-4 gap-y-6 p-6 border-[1.5px] border-(--primary50) rounded-lg max-[1023px]:mt-3 ">
      <li className={liItemStyle}>
        <CakeOutlinedIcon className={iconStyle} />
        <div className="">
          <p className={titleStyle}>DATE OF BIRTH</p>
          <p className={valueStyle}>
            {dateFormat(date_of_birth, "dateOfBirth") || "no data"}
          </p>
        </div>
      </li>
      <li className={liItemStyle}>
        <AccountCircleOutlinedIcon className={iconStyle} />
        <div className="">
          <p className={titleStyle}>GENDER</p>
          <p className={valueStyle}>{gender || "no data"}</p>
        </div>
      </li>
      <li className={liItemStyle}>
        <LayersOutlinedIcon className={iconStyle} />
        <div className="">
          <p className={titleStyle}>Experience</p>
          <p className={valueStyle}>{experience || "no data"}</p>
        </div>
      </li>
      <li className={liItemStyle}>
        <SchoolOutlinedIcon className={iconStyle} />
        <div className="">
          <p className={titleStyle}>Education</p>
          <p className={valueStyle}>{education || "no data"}</p>
        </div>
      </li>
    </ul>
  );
};

export default GeneralData;
