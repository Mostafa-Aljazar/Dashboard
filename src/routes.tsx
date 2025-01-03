import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./auth/login/page";
import AuthLayout from "./auth/layout";
import Verifications from "./auth/verification/page";
function Routers() {
  return (
    <Routes>
      <Route path="auth" element={<AuthLayout />}>
        <Route index element={<Navigate to={"/auth/login"} />} />
        <Route path="login" element={<Login />} />
        <Route path="verify" element={<Verifications />} />
      </Route>
      <Route path="/" element={<div className="bg-gray-600">home</div>}></Route>
    </Routes>
  );
}

export default Routers;
