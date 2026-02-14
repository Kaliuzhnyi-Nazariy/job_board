// import { useEffect } from "react";
import { Outlet } from "react-router";
// import { useAppDispatch } from "../../features/hooks/dispatchHook";
// import { getMe } from "../../features/user/userRequest";
import Navbar from "../Components/Navbar";
import Header from "../Components/header/Header";

const UserLayout = () => {
  // fetch user

  return (
    <>
      <Navbar />
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default UserLayout;
