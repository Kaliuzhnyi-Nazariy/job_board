import { Outlet } from "react-router";
import Navbar from "../Components/Navbar/Navbar";

const UserLayout = () => {
  // fetch user

  return (
    <div className="min-h-screen flex flex-col w-full">
      <Navbar />
      {/* <Header /> */}
      <main className="flex flex-col flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;
