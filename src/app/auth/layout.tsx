import { Navigate, Outlet } from "react-router-dom";
import images from "../../assets";
import { Image } from "@mantine/core";
import { isAuthenticated } from "../../utils/is-authenticated";

function AuthLayout() {
  if (isAuthenticated()) {
    return <Navigate to="/dashboard" replace />;
  }
  return (
    <div className="h-screen flex-1  flex flex-col">
      <nav className="w-full p-4 ">
        <Image
          src={images.linkatik}
          alt="linkatik"
          fit="contain"
          className=" w-20 h-18 md:w-28 md:h-18 md:ml-4"
        />
      </nav>
      <div className="m-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
