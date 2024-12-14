
import { useState, useEffect } from "react";
import Login from "../login/Login";
import { redirect, useNavigate } from "react-router-dom";
import authToken from "../../components/authToken";
import auth from "../../Service/auth";
const Navbar = () => {
    const [ChaneLogin, setChaneLogin] = useState(false);
    const navigate = useNavigate();
    const handLogin = () => {
        // setChaneLogin(!ChaneLogin);
        navigate('/login');
    }
    const [username, setUsername] = useState(null); // Trạng thái lưu tên người dùng

    const getUserNameData = async () => {
        try {
            const prf = await auth.current(); // Gọi API để lấy thông tin người dùng
            console.log(prf.user.username);
            setUsername(prf.user.username); // Cập nhật trạng thái username
        } catch (error) {
            console.error("Error fetching username:", error);
        }
    };
    // Gọi hàm lấy tên người dùng chỉ khi đã có authToken
    useEffect(() => {
        if (authToken.getToken()) {
            getUserNameData();
        }
    }, [authToken]);
    return (
        <div className="fixed">

            <div className="w-screen h-12 bg-[#91DDCF] flex items-center justify-around ">
                <a href="/" className="uppercase font-bold flex-none text-white text-xl">
                    thư viện online
                </a>
                <div class="w-full max-w-sm min-w-[200px] grow mx-36" >
                    <div class="relative">
                        <input
                            class="w-full p-1 pl-3 rounded-2xl border border-slate-200 focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                            placeholder="Tìm kiếm"
                        />
                        <button
                            class="absolute top-0 right-0 flex items-center h-full px-2" >
                            <div>
                                <svg className="" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>
                            </div>

                        </button>
                    </div>
                </div>
                {!authToken.getToken() ? (
                    <button
                        onClick={handLogin}
                        className="bg-white rounded-lg shadow-xl p-1 flex-none"
                        style={{ textAlign: "center" }}
                    >
                        Đăng nhập
                    </button>
                ) : (
                    <div>
                        {username ? (
                            <span>
                                Xin chào, {username}!
                                <button
                                    onClick={() => {
                                        authToken.deleteToken();
                                        navigate("/");
                                    }}
                                    className="ml-2 bg-red-400 p-2 rounded-lg">Logout</button>
                            </span>
                        ) : (
                            <span>
                                Đang tải thông tin...
                                <button
                                    onClick={() => {
                                        authToken.deleteToken();
                                        navigate("/");
                                    }}
                                    className="ml-2 bg-red-400 p-2 rounded-lg">
                                    Logout
                                </button>
                            </span>
                        )}
                    </div>
                )}

            </div>
            {
                (ChaneLogin == true) && (

                    <Login />
                )
            }
        </div>

    );
}

export default Navbar;