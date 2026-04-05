import { Outlet } from "react-router";
import Navbar from "../Components/Navbar/Navbar";

const UserLayout = () => {
  // fetch user

  return (
    <>
      <Navbar />
      {/* <Header /> */}
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default UserLayout;
