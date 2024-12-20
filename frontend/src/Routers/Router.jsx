import NoPage from "../Pages/Center/NoPage";
import Center from "../Pages/Center/Center";
import Layout from "../Pages/Layout";
import LayoutStaff from "../Pages/staff/LayoutStaff";
import Dashboard from "../Pages/staff/dashboard/page";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Usermanagement from "../Pages/staff/User/Usermanagement";
import BorrowReturnmanagement from "../Pages/staff/BorrowReturnmanagement";
import Login from "../Pages/login/Login";
import Categorymanagement from "../Pages/staff/Category/Categorymanagement";
import Bookmanagement from "../Pages/staff/Book/Bookmanagement";
import RequestList from "../Pages/danhmuc/requestList";
import RequestedList from "../Pages/danhmuc/requestedList";
import HistoryRequestList from "../Pages/danhmuc/historyRequestList";
import BookDetail from "../Pages/Center/bookDetail";
import authToken from "../components/authToken";
import Search from "../Pages/Center/search";
const Router = () => {
    return (
        <BrowserRouter>
            {/* {isAdmin ? <></> : <Navbar />} */}
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Center />} />
                    <Route path="*" element={<NoPage />} />
                    <Route path="/search/:id" element={<Search />} />
                    {
                        authToken.getToken() && (
                            <>
                                <Route path="requestlist" element={<RequestList />} />
                                <Route path="requestedlist" element={<RequestedList />} />
                                <Route path="historyrequestlist" element={<HistoryRequestList />} />
                            </>
                        )
                    }

                    <Route path="/book/detail/:id" element={<BookDetail />} />
                </Route>
                <Route >
                    <Route path="/login" element={<Login />} />
                </Route>
                <Route path="staff" element={<LayoutStaff />}>
                    <Route index element={<Dashboard />} />
                    <Route path="usermanagement" element={<Usermanagement />} />
                    <Route path="categorymanagement" element={<Categorymanagement />} />
                    <Route path="bookmanagement" element={<Bookmanagement />} />
                    <Route path="borrowreturnmanagement" element={<BorrowReturnmanagement />} />

                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
export default Router;