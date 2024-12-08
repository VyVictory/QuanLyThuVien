import { Outlet } from "react-router-dom";
import Navbar from "./Header/Navbar";
import { useState } from "react";
import Home from "./Center/Home";
import LeftBar from "./leftBar/leftBar";

const Layout = () => {
    const [dataName, setDataName] = useState('tatca');
    function chaneSelect(selectData) {
        setDataName(selectData)
    }
    return (
        <>
            <Navbar />
            <div className="flex h-full">
                <div className="pt-12 min-h-screen">
                    <LeftBar select={chaneSelect} />
                </div>
                <div className="h-full w-full">
                    <Outlet />
                </div>
            </div>
        </>
    );
}

export default Layout;