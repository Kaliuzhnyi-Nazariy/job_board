import { useAppDispatch } from "../../../features/hooks/dispatchHook";
import { logout } from "../../../features/auth/authRequest";
import type { IResponse } from "../../../features/auth/interface";

const Home = () => {
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    const res = await dispatch(logout());

    if ((res.payload as IResponse).ok) {
      console.log("everything is alright");
    }
  };

  return (
    <div>
      <h1>candidate home</h1>
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
};

export default Home;
