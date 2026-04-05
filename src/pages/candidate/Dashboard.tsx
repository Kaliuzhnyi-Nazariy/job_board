import DashboardLayout from "../../Components/Dashboard/DashboardLayout";
import DashboardCandidateLinks from "./DashboardCandidateLinks";

const Dashboard = () => {
  return (
    <DashboardLayout title="candidate dashboard">
      <div className="hidden lg:block h-full">
        <DashboardCandidateLinks />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
