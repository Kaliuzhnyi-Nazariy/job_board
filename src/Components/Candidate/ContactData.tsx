import { Link } from "react-router";

import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PhoneInTalkOutlinedIcon from "@mui/icons-material/PhoneInTalkOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

const ContactData = ({
  website,
  location,
  phone,
  email,
}: {
  website?: string;
  location?: string;
  phone?: string;
  email?: string;
}) => {
  const liStyle = "flex gap-4 overflow-hidden";
  const iconStyle = "text-8 text-(--primary5)";
  const titleStyle = "text-(--gray5) text-[12px] uppercase ";
  const valueStyle = "body_small_500 mt-1";

  return (
    <div className=" p-6 border-[1.5px] border-(--primary50) rounded-lg">
      <p className="body_medium_500">Contact Information</p>
      <ul className="mt-6 flex flex-col gap-y-5">
        <li className={liStyle}>
          <LanguageOutlinedIcon className={iconStyle} />
          <div className="w-full">
            <p className={titleStyle}>Website</p>
            {website ? (
              <Link
                to={website}
                target="_blank"
                className="body_small_500 mt-1 overflow-hidden text-ellipsis text-nowrap w-4/7 min-[425px]:w-6/7 block"
              >
                {website}
              </Link>
            ) : (
              <p className="body_small_500 mt-1">no data</p>
            )}
          </div>
        </li>

        <li className="h-px bg-(--gray1) w-full"></li>

        <li className={liStyle}>
          <LocationOnOutlinedIcon className={iconStyle} />
          <div className="">
            <p className={titleStyle}>Loaction</p>
            <p className={valueStyle}>{location || "no data"}</p>
          </div>
        </li>

        <li className="h-px bg-(--gray1) w-full"></li>

        <li className={liStyle}>
          <PhoneInTalkOutlinedIcon className={iconStyle} />
          <div className="">
            <p className={titleStyle}>Phone</p>
            {phone ? (
              <Link to={`tel:` + phone} className={valueStyle}>
                {phone}
              </Link>
            ) : (
              <p className={valueStyle}>no data</p>
            )}
          </div>
        </li>

        <li className="h-px bg-(--gray1) w-full"></li>

        <li className={liStyle}>
          <EmailOutlinedIcon className={iconStyle} />
          <div className="">
            <p className={titleStyle}>Email address</p>
            {email ? (
              <Link to={`mailto:` + email} className={valueStyle}>
                {email}
              </Link>
            ) : (
              <p className={valueStyle}>No data</p>
            )}
          </div>
        </li>
      </ul>
    </div>
  );
};

export default ContactData;
