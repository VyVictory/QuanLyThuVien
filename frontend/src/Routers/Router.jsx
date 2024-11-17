
import Navbar from "../Pages/Header/Navbar";
import NoPage from "../Pages/Center/NoPage";
import Center from "../Pages/Center/Center";
import Layout from "../Pages/Layout";
import LayoutStaff from "../Pages/staff/LayoutStaff";
import Dashboard from "../Pages/staff/dashboard/page";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Login from "../Pages/login/Login";
const Router = () => {
    const isAdmin = false;
    return (
        <BrowserRouter>
            {/* {isAdmin ? <></> : <Navbar />} */}
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Center />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
                <Route >
                    <Route path="/login" element={<Login />} />
                </Route>
                <Route path="staff" element={<LayoutStaff />}>
                    <Route index element={<Dashboard />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
export default Router;