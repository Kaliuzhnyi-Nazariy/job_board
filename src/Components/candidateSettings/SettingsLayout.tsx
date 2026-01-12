import { Link, Outlet } from "react-router";

const SettingsLayout = () => {
  return (
    <div className="flex flex-col">
      <h1>Settings</h1>
      <ul className="flex">
        <li>
          <Link to="personal">Personal</Link>
        </li>
        <li>
          <Link to="profile">Profile</Link>
        </li>
        <li>
          <Link to="social">Social Links</Link>
        </li>
        <li>
          <Link to="account">Account Setting</Link>
        </li>
      </ul>

      <Outlet />
    </div>
  );
};

export default SettingsLayout;
