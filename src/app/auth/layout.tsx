import { Outlet } from "react-router-dom";
import images from "../../assets";

function AuthLayout() {
  return (
    <div className="flex flex-row h-screen">
      {/* right section */}
      <div className="flex-1  flex flex-col">
        <nav className="w-full p-[40px] ">
          <img src={images.linkatik} alt="linkatik" width={125} height={46} />
        </nav>
        <div className="m-auto">
          <Outlet />
        </div>
      </div>

      <div className="lg:w-[461px]   bg-[#F4F4F4]"></div>
    </div>
  );
}

export default AuthLayout;
