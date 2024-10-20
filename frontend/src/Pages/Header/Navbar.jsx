
import { useState } from "react";

import Login from "../component/Login";
const Navbar = () => {
    const [ChaneLogin, setChaneLogin] = useState(false);
    const handLogin = () => {
        setChaneLogin(!ChaneLogin);
    }
    return (
        <>
            <div className="w-screen h-12 bg-blue-400 flex items-center justify-around">
                <div className="uppercase font-bold flex-none text-white text-xl">
                    thư viện online
                </div>
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
                <button onClick={handLogin} className="bg-white rounded-lg shadow-inner shadow-xl p-1 flex-none " style={{ textAlign: 'center' }}>
                    Đăng nhập
                </button>

                {
                    (ChaneLogin == true) && (
                        <Login />
                    )
                }

            </div>
        </>
    );
}

export default Navbar;