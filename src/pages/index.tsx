import { Link } from "react-router";

const Greeting = () => {
  return (
    <div>
      <h1>Greeting</h1>
      <div style={{ display: "flex", gap: "12px" }}>
        <Link to={"/auth/signin"}>Sign in</Link>
        <Link to={"/auth/signup"}>Start now</Link>
      </div>
    </div>
  );
};

export default Greeting;
