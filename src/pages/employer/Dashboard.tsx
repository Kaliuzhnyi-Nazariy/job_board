import { Link, Outlet } from "react-router";

const Dashboard = () => {
  const baseURL = "/employer/dashboard";
  return (
    <div className="flex gap-5">
      <div>
        <h4 className="uppercase">employers Dashboard</h4>
        <ul>
          <li>
            <Link to={baseURL}>Overview</Link>
          </li>
          <li>
            <Link to="#">Employer Profile</Link>
          </li>
          <li>
            <Link to={`${baseURL}/post-a-job`}>Post a Job</Link>
          </li>
          <li>
            <Link to={`${baseURL}/my-jobs`}>My Jobs</Link>
          </li>
          <li>
            <Link to="#">Saved Candidates</Link>
          </li>
          <li>
            <Link to="#">Plans & Billing</Link>
          </li>
          <li>
            <Link to="#">All Companies</Link>
          </li>
          <li>
            <Link to="#">Settings</Link>
          </li>
        </ul>
      </div>

      <Outlet />
    </div>
  );
};

export default Dashboard;
