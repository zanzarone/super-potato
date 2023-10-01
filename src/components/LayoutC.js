import { Outlet } from "react-router-dom";
import Header from "./Header";
// import SectionHeader from "./SectionHeader";

const LayoutC = () => {
    return (
        <>
            <Header />
            <div className="responsiveWrapper">
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
