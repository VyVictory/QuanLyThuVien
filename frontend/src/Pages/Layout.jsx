import { Outlet } from "react-router-dom";
import Navbar from "./Header/Navbar";

const Layout = () => {
    return (
        <>  
            <Navbar />
            <div className="z-10">
                <Outlet />
            </div>
        </>
    );
}

export default Layout;