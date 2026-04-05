import { Navigate, Route, Routes } from "react-router";
import { lazy, useEffect } from "react";

import { ToastContainer } from "react-toastify";
import PrtoectedRoute from "./layouts/ProtectedRoute";
import RestrictedRoute from "./layouts/RestrictedRoute";
import { useAppDispatch } from "../features/hooks/dispatchHook";
import { refreshUser } from "../features/user/userRequest";

// Auth
const SigninPage = lazy(() => import("./pages/auth/Signin"));
const SignupPage = lazy(() => import("./pages/auth/Signup"));
const ForgetPage = lazy(() => import("./pages/auth/ForgetPassword"));
const ResetPasswordPage = lazy(() => import("./pages/auth/ResetPassword"));

// Home
const HomePage = lazy(() => import("./pages/Home"));

// Terms
const TermsPage = lazy(() => import("./pages/Terms/terms"));

// Protecting routes
const UserLayoutComponent = lazy(() => import("./layouts/UserLayout"));

// candidate
const FindJob = lazy(() => import("./pages/candidate/FindJob"));
const CandidateDashboard = lazy(() => import("./pages/candidate/Dashboard"));
const OverviewCandidate = lazy(() => import("./pages/candidate/Overview"));
const JobPage = lazy(() => import("./pages/candidate/Job"));

// candidate settings
const SettingsLayout = lazy(
  () => import("./Components/candidateSettings/SettingsLayout"),
);

// employer settings
const EmployerPersonalSettingsPage = lazy(
  () => import("./pages/employer/Settings/Personal"),
);

const PersonalPage = lazy(
  () => import("./pages/candidate/Setting/Personal/Personal"),
);
const ProfilePage = lazy(() => import("./pages/candidate/Setting/Profile"));
const SocialPage = lazy(() => import("./pages/candidate/Setting/Social"));
const AccountPage = lazy(
  () => import("./pages/candidate/Setting/Account/Account"),
);

const AppliedPage = lazy(() => import("./pages/candidate/Applied/Applied"));

// employer
const EmployerDashboard = lazy(() => import("./pages/employer/Dashboard"));
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

// error pages

const Forbidden = lazy(() => import("./pages/error/Forbidden"));

const NotFoundPage = lazy(() => import("./pages/error/NotFound"));

// routes

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route element={<RestrictedRoute />}>
          <Route path="/auth">
            <Route index element={<Navigate to="signin" replace />} />
            <Route path="signin" element={<SigninPage />} />
            <Route path="signup" element={<SignupPage />} />
          </Route>
          <Route path="/forget-password" element={<ForgetPage />} />
          <Route path=" " element={<ResetPasswordPage />} />
        </Route>
        <Route path="/" element={<UserLayoutComponent />}>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/candidate"
            element={<PrtoectedRoute allowedRoles={["candidate"]} />}
          >
            <Route index element={<Navigate to="find-job" replace />} />
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
          <Route
            path="/employer"
            element={<PrtoectedRoute allowedRoles={["employer"]} />}
          >
            <Route path="dashboard" element={<EmployerDashboard />}>
              <Route path="" element={<EmployerOverviewPage />} />
              <Route path="post-a-job" element={<PostJobPage />} />
              <Route path="my-jobs" element={<MyJobsPage />} />
              <Route path="my-jobs/:jobId" element={<MyJobPage />} />
              <Route
                path="view-application/:jobId"
                element={<ApplicationPage />}
              />
              <Route
                path="settings"
                element={<EmployerPersonalSettingsPage />}
              />
            </Route>
            <Route path="candidates" element={<FindACandidatePage />} />
            <Route path="candidates/:candidateId" element={<CandidatePage />} />
          </Route>
          <Route path="/terms" element={<TermsPage />} />
        </Route>
        <Route path="/forbidden" element={<Forbidden />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
