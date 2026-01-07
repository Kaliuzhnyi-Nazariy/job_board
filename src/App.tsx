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
const CandidateDashboard = lazy(() => import("./pages/candidate/Dashboard"));

const EmployerDashboard = lazy(() => import("./pages/employer/Dashboard"));
const HomeEmployer = lazy(() => import("./pages/employer/home"));
const EmployerOverviewPage = lazy(() => import("./pages/employer/Overview"));
const PostJobPage = lazy(() => import("./pages/employer/PostAJob"));

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
        <Route path="/candidate" element={<CandidateRouteComponent />}>
          <Route path="home" element={<HomeCandidate />} />
          <Route path="find-job" element={<FindJob />} />
          <Route path="dashboard" element={<CandidateDashboard />}>
            {/* <Route></Route> */}
          </Route>
        </Route>
        <Route path="/employer" element={<EmployerRouteComponent />}>
          <Route path="home" element={<HomeEmployer />} />
          <Route path="dashboard" element={<EmployerDashboard />}>
            <Route path="" element={<EmployerOverviewPage />} />
            <Route path="post-a-job" element={<PostJobPage />} />
          </Route>
        </Route>
      </Route>
      <Route path="/forbidden" element={<Forbidden />} />
    </Routes>
  );
}

export default App;
