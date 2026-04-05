import DashboardLayout from "../../Components/Dashboard/DashboardLayout";
import DashboardEmployerLinks from "./DashboardEmployerLinks";

const Dashboard = () => {
  return (
    <DashboardLayout title="EMPLOYERS DASHBOARD">
      <div className="hidden lg:block h-full">
        <DashboardEmployerLinks />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
