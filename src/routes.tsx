import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./app/auth/login/page";
import AuthLayout from "./app/auth/layout";
import Dashboard from "./app/dashboard/home/page";
import Dashboard_Layout from "./app/dashboard/layout";
import Users from "./app/dashboard/users/page";
import UsersLog from "./app/dashboard/users-logs/page";
import UsersNotifications from "./app/dashboard/users-notifications/page";
import UsersLinks from "./app/dashboard/users-links/page";
import BioThemes from "./app/dashboard/bio-themes/page";
import QrCodes from "./app/dashboard/qr-codes/page";
import Domains from "./app/dashboard/domains/page";
import Plans from "./app/dashboard/plans/All-Plans/page";
import Codes from "./app/dashboard/codes/page";
import Payments from "./app/dashboard/payments/page";
import Statistics from "./app/dashboard/statistics/page";
import ApiDocs from "./app/dashboard/api-docs/page";
import Broadcasts from "./app/dashboard/broadcasts/page";
import Settings from "./app/dashboard/settings/page";
import Help from "./app/dashboard/help/page";
import PLan_Layout from "./app/dashboard/plans/layout";
import CreatePLanPage from "./app/dashboard/plans/Create-Plan/page";

function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth/login" replace />} />
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
        <Route path="plans" element={<PLan_Layout />}>
          <Route path="" element={<Plans />} />
          <Route path="create-plan" element={<CreatePLanPage />} />
        </Route>
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
