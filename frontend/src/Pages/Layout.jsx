import { Outlet } from "react-router-dom";
import Navbar from "./Header/Navbar";

const Layout = () => {
    return (
        <>  
            <Navbar />
            <div className="pt-12 h-screen z-10">
                <Outlet />
            </div>
        </>
    );
}

export default Layout;