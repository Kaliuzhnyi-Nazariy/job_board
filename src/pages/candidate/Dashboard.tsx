import { Link, Outlet } from "react-router";

const Dashboard = () => {
  const baseURL = "/candidate/dashboard";

  return (
    <div className="flex gap-5">
      <div className="">
        <h4 className="uppetcase">candidate dashboard</h4>
        <ul>
          <li>
            <Link to={`${baseURL}`}>Overview</Link>
          </li>
          <li>
            <Link to={`${baseURL}/`}>Applied Jobs</Link>
          </li>
          <li>
            <Link to={`${baseURL}/`}>Favorite Jobs</Link>
          </li>
          <li>
            <Link to={`${baseURL}/`}>Job alert</Link>
          </li>
          <li>
            <Link to={`${baseURL}/`}>Settings</Link>
          </li>
        </ul>
      </div>

      <Outlet />
    </div>
  );
};

export default Dashboard;
