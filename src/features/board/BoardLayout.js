import { Outlet } from "react-router-dom";
import BoardHeader from "./BoardHeader";
// import DashHeader from './DashHeader'
// import DashFooter from './DashFooter'

const BoardLayout = () => {
  return (
    <>
      <BoardHeader />
      <div
        className={`responsiveWrapper`}
        style={{
          display: "flex",
          paddingTop: "2rem",
          paddingBottom: "2rem",
          backgroundColor: "red",
        }}
      >
        <Outlet />
      </div>
      {/* <DashFooter /> */}
    </>
  );
};
export default BoardLayout;
