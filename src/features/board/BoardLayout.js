import { Outlet } from "react-router-dom";
import BoardHeader from "./BoardHeader";
// import DashHeader from './DashHeader'
// import DashFooter from './DashFooter'

const BoardLayout = () => {
    return (
        <>
            <BoardHeader />
            <div className={"responsiveWrapper"}>
                <div className="content">
                    <div className="content-panel">
                        <div className="vertical-tabs">
                            <a href="#" className="active">
                                View all
                            </a>
                            <a href="#">Developer tools</a>
                            <a href="#">Communication</a>
                            <a href="#">Productivity</a>
                            <a href="#">Browser tools</a>
                            <a href="#">Marketplace</a>
                        </div>
                    </div>
                    <div className="content-main">soka</div>
                </div>
                {/* <Outlet /> */}
            </div>
            {/* <DashFooter /> */}
        </>
    );
};
export default BoardLayout;
