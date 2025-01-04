import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./auth/login/page";
import AuthLayout from "./auth/layout";
import OTP from "./auth/otp/page";
import Dashboard from "./dashboard/page";
function Routers() {
  return (
    <Routes>
      <Route path="auth" element={<AuthLayout />}>
        <Route index element={<Navigate to={"/auth/login"} />} />
        <Route path="login" element={<Login />} />
        {/* <Route path="otp" element={<OTP />} /> */}
      </Route>
      <Route path="/" element={<div className="bg-gray-600">home</div>}></Route>
      <Route path="/dashboard" element={<Dashboard />}></Route>
    </Routes>
  );
}

export default Routers;
