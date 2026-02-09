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
  const titleStyle = "mt-3 text-[12px] uppercase text-(--gray5)";
  const valueStyle = "mt-1 body_small_500";

  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-6 p-6 border-[1.5px] border-(--primary50) rounded-lg">
      <li className="">
        <CakeOutlinedIcon className={iconStyle} />
        <p className={titleStyle}>DATE OF BIRTH</p>
        <p className={valueStyle}>
          {dateFormat(date_of_birth, "dateOfBirth") || "no data"}
        </p>
      </li>
      <li className="">
        <AccountCircleOutlinedIcon className={iconStyle} />
        <p className={titleStyle}>GENDER</p>
        <p className={valueStyle}>{gender || "no data"}</p>
      </li>
      <li className="">
        <LayersOutlinedIcon className={iconStyle} />
        <p className={titleStyle}>Experience</p>
        <p className={valueStyle}>{experience || "no data"}</p>
      </li>
      <li className="">
        <SchoolOutlinedIcon className={iconStyle} />
        <p className={titleStyle}>Education</p>
        <p className={valueStyle}>{education || "no data"}</p>
      </li>
    </ul>
  );
};

export default GeneralData;
