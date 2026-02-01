import { Navigate, Route, Routes } from "react-router";
import Greeting from "./pages";
import { lazy } from "react";

const AuthPage = lazy(() => import("./pages/auth/Auth"));
const SigninPage = lazy(() => import("./pages/auth/Signin"));
const SignupPage = lazy(() => import("./pages/auth/Signup"));
const ForgetPage = lazy(() => import("./pages/auth/ForgetPassword"));
const ResetPasswordPage = lazy(() => import("./pages/auth/ResetPassword"));

const TermsPage = lazy(() => import("./pages/terms"));

const UserLayoutComponent = lazy(() => import("./layouts/UserLayout"));
const CandidateRouteComponent = lazy(() => import("./layouts/CandidateRoute"));
const EmployerRouteComponent = lazy(() => import("./layouts/EmployerRoute"));

// candidate
const HomeCandidate = lazy(() => import("./pages/candidate/home"));
const FindJob = lazy(() => import("./pages/candidate/FindJob"));
const CandidateDashboard = lazy(() => import("./pages/candidate/Dashboard"));
const OverviewCandidate = lazy(() => import("./pages/candidate/Overview"));
const JobPage = lazy(() => import("./pages/candidate/Job"));

// candidate settings
const SettingsLayout = lazy(
  () => import("./Components/candidateSettings/SettingsLayout"),
);

const PersonalPage = lazy(() => import("./pages/candidate/Setting/Personal"));
const ProfilePage = lazy(() => import("./pages/candidate/Setting/Profile"));
const SocialPage = lazy(() => import("./pages/candidate/Setting/Social"));
const AccountPage = lazy(
  () => import("./pages/candidate/Setting/Account/Account"),
);

const AppliedPage = lazy(() => import("./pages/candidate/Applied"));

// employer
const EmployerDashboard = lazy(() => import("./pages/employer/Dashboard"));
const HomeEmployer = lazy(() => import("./pages/employer/home"));
const EmployerOverviewPage = lazy(() => import("./pages/employer/Overview"));
const PostJobPage = lazy(() => import("./pages/employer/PostAJob"));
const FindACandidatePage = lazy(
  () => import("./pages/employer/Candidates/FindACandidate"),
);
const CandidatePage = lazy(
  () => import("./pages/employer/Candidates/Candidate"),
);
const MyJobsPage = lazy(() => import("./pages/employer/Jobs/MyJobs"));
const MyJobPage = lazy(() => import("./pages/employer/Jobs/Job"));

const ApplicationPage = lazy(
  () => import("./pages/employer/Applications/Applications"),
);

const Forbidden = lazy(() => import("./pages/error/Forbidden"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Greeting />} />
      <Route path="/auth" element={<AuthPage />}>
        <Route index element={<Navigate to="signin" replace />} />
        <Route path="signin" element={<SigninPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="forget-password" element={<ForgetPage />} />
      </Route>
      <Route path="/reset-password/*" element={<ResetPasswordPage />} />
      <Route path="/" element={<UserLayoutComponent />}>
        <Route path="/candidate" element={<CandidateRouteComponent />}>
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<HomeCandidate />} />
          <Route path="find-job" element={<FindJob />} />
          <Route path="find-job/:jobId" element={<JobPage />} />
          <Route path="dashboard" element={<CandidateDashboard />}>
            <Route path="" element={<OverviewCandidate />} />
            <Route path="setting" element={<SettingsLayout />}>
              <Route index element={<Navigate to="personal" replace />} />
              <Route path="personal" element={<PersonalPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="social" element={<SocialPage />} />
              <Route path="account" element={<AccountPage />} />
            </Route>
            <Route path="applied-jobs" element={<AppliedPage />} />
          </Route>
        </Route>
        <Route path="/employer" element={<EmployerRouteComponent />}>
          <Route path="home" element={<HomeEmployer />} />
          <Route path="dashboard" element={<EmployerDashboard />}>
            {/* <Route index element={<Navigate to="" replace />} /> */}
            <Route path="" element={<EmployerOverviewPage />} />
            <Route path="post-a-job" element={<PostJobPage />} />
            <Route path="my-jobs" element={<MyJobsPage />} />
            <Route path="my-jobs/:jobId" element={<MyJobPage />} />
          </Route>
          <Route path="view-application/:jobId" element={<ApplicationPage />} />
          <Route path="candidates" element={<FindACandidatePage />} />
          <Route path="candidates/:candidateId" element={<CandidatePage />} />
        </Route>
      </Route>
      <Route path="/forbidden" element={<Forbidden />} />
      <Route path="/terms" element={<TermsPage />} />
    </Routes>
  );
}

export default App;
