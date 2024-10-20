import { Outlet } from "react-router-dom";
import Navbar from "./Header/Navbar";

const Layout = () => {
    return (
        <>
            <Outlet />
        </>
    );
}

export default Layout;