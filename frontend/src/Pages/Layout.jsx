import { Outlet } from "react-router-dom";
import Navbar from "./Header/Navbar";

const Layout = () => {
    return (
        <>
            <Navbar />
            <div className="pt-12">
                <Outlet />
            </div>
        </>
    );
}

export default Layout;