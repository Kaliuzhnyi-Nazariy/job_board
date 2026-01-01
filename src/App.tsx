import { Route, Routes } from "react-router";
import Greeting from "./pages";
import { lazy } from "react";

const SigninPage = lazy(() => import("./pages/auth/Signin"));
const SignupPage = lazy(() => import("./pages/auth/Signup"));
const ForgetPage = lazy(() => import("./pages/auth/ForgetPassword"));
const ResetPasswordPage = lazy(() => import("./pages/auth/ResetPassword"));

const UserLayoutComponent = lazy(() => import("./layouts/UserLayout"));
const CandidateRouteComponent = lazy(() => import("./layouts/CandidateRoute"));
const EmployerRouteComponent = lazy(() => import("./layouts/EmployerRoute"));

const HomeCandidate = lazy(() => import("./pages/candidate/home"));
const FindJob = lazy(() => import("./pages/candidate/FindJob"));

const HomeEmployer = lazy(() => import("./pages/employer/home"));

const Forbidden = lazy(() => import("./pages/error/Forbidden"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Greeting />} />
      <Route path="/auth/signin" element={<SigninPage />} />
      <Route path="/auth/signup" element={<SignupPage />} />
      <Route path="/forget-password" element={<ForgetPage />} />
      <Route path="/reset-password/*" element={<ResetPasswordPage />} />
      <Route path="/" element={<UserLayoutComponent />}>
        <Route element={<CandidateRouteComponent />}>
          <Route path="/candidate/home" element={<HomeCandidate />} />
          <Route path="/candidate/find-job" element={<FindJob />} />
        </Route>
        <Route element={<EmployerRouteComponent />}>
          <Route path="/employer/home" element={<HomeEmployer />} />
        </Route>
      </Route>
      <Route path="/forbidden" element={<Forbidden />} />
    </Routes>
  );
}

export default App;
