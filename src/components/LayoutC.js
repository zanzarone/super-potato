import { Link, Outlet } from "react-router-dom";
import Header from "./Header";
import SectionHeader from "./SectionHeader";
import { useLocation } from "react-router-dom";
import { Gear, UserCircle } from "@phosphor-icons/react";

const LayoutC = () => {
  const location = useLocation().pathname;
  const elements = <p>{location}</p>;

  return (
    <>
      <Header />
      <SectionHeader title={"Hi, Samuele."} />
      <div className="responsiveWrapper">
        <div className="content">
          <div className="content-panel">
            <div className="vertical-tabs">
              <Link className="item active">
                <UserCircle size={28} />
                <span>My profile</span>
              </Link>
              <Link className="item">
                <Gear size={28} />
                <span>Settings</span>
              </Link>
            </div>
          </div>
          <div className="content-main">
            <Outlet />
          </div>
        </div>
      </div>
      {/* <DashFooter /> */}
    </>
  );
};
export default LayoutC;
