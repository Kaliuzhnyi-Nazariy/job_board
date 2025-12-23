import { Route, Routes } from "react-router";
import Greeting from "./pages";
import { lazy } from "react";

const SigninPage = lazy(() => import("./pages/auth/Signin"));
const SignupPage = lazy(() => import("./pages/auth/Signup"));
const ForgetPage = lazy(() => import("./pages/auth/ForgetPassword"));
const ResetPasswordPage = lazy(() => import("./pages/auth/ResetPassword"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Greeting />} />
      <Route path="/auth/signin" element={<SigninPage />} />
      <Route path="/auth/signup" element={<SignupPage />} />
      <Route path="/forget-password" element={<ForgetPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
    </Routes>
  );
}

export default App;
