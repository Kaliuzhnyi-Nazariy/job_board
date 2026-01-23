import { Link } from "react-router";

const CandidateContactInformation = (data: {
  website: string;
  location: string;
  phone: string;
  email: string;
}) => {
  return (
    <div className="">
      <h3>Contact Information</h3>
      <ul>
        {data.website && (
          <li>
            <div className="flex gap-4">
              <div className="size-8 rounded-full bg-blue-500"></div>
              <div>
                <h5>WEBSite</h5>
                <Link to={data.website}>{data.website}</Link>
              </div>
            </div>
          </li>
        )}
        {data.location && (
          <li>
            <div className="flex gap-4">
              <div className="size-8 rounded-full bg-blue-500"></div>
              <div>
                <h5>location</h5>
                <p>{data.location}</p>
              </div>
            </div>
          </li>
        )}
        {data.phone && (
          <li>
            <div className="flex gap-4">
              <div className="size-8 rounded-full bg-blue-500"></div>
              <div>
                <h5>phone</h5>
                <p>{data.phone}</p>
              </div>
            </div>
          </li>
        )}
        <li>
          <div className="flex gap-4">
            <div className="size-8 rounded-full bg-blue-500"></div>
            <div>
              <h5>Email Address</h5>
              <Link to={`mailto:${data.website}`}>{data.email}</Link>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default CandidateContactInformation;
