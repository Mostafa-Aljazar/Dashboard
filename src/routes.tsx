import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./auth/login/page";
import AuthLayout from "./auth/layout";
import OTP from "./auth/otp/page";
import Dashboard from "./dashboard/home/page";
import Dashboard_Layout from "./dashboard/layout";
import Users from "./dashboard/users/page";
import UsersLog from "./dashboard/users-logs/page";
import UsersNotifications from "./dashboard/users-notifications/page";
import UsersLinks from "./dashboard/users-links/page";
import BioThemes from "./dashboard/bio-themes/page";
import QrCodes from "./dashboard/qr-codes/page";
import Domains from "./dashboard/domains/page";
import Plans from "./dashboard/plans/page";
import Codes from "./dashboard/codes/page";
import Payments from "./dashboard/payments/page";
import Statistics from "./dashboard/statistics/page";
import ApiDocs from "./dashboard/api-docs/page";
import Broadcasts from "./dashboard/broadcasts/page";
import Settings from "./dashboard/settings/page";
import Help from "./dashboard/help/page";

function Routers() {
  return (
    <Routes>
      <Route path="auth" element={<AuthLayout />}>
        <Route index element={<Navigate to={"/auth/login"} />} />
        <Route path="login" element={<Login />} />
        {/* <Route path="otp" element={<OTP />} /> */}
      </Route>
      {/* <Route path="/" element={<div className="bg-gray-600">home</div>}></Route> */}
      <Route path="dashboard" element={<Dashboard_Layout />}>
        <Route path="" element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="users-log" element={<UsersLog />} />
        <Route path="users-notifications" element={<UsersNotifications />} />
        <Route path="users-links" element={<UsersLinks />} />
        <Route path="bio-themes" element={<BioThemes />} />
        <Route path="qr-codes" element={<QrCodes />} />
        <Route path="domains" element={<Domains />} />
        <Route path="plans" element={<Plans />} />
        <Route path="codes" element={<Codes />} />
        <Route path="payments" element={<Payments />} />
        <Route path="statistics" element={<Statistics />} />
        <Route path="api-docs" element={<ApiDocs />} />
        <Route path="broadcasts" element={<Broadcasts />} />
        <Route path="settings" element={<Settings />} />   
        <Route path="help" element={<Help />} />   
      </Route>
    </Routes>
  );
}

export default Routers;
