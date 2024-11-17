import { Link } from "react-router-dom";
import bg_login from "../../img/login/bg_login.jpg"

// className={`bg-[ url('${bg_login}') ]  `}

const Login = () => {
    return (
        <div className={`h-screen w-screen block bg-cover`} style={{ backgroundImage: `url(${bg_login})` }}>
            <div className="absolute  bg-opacity-[0%] top-0 left-0 w-screen h-full justify-center flex">
                <div className=" w-[400px] h-full py-8 text-white">
                    <div className="bg-black bg-opacity-70 h-full w-full rounded-2xl p-6">
                        <div className="h-4/5 flex items-center flex-col">
                            <div>
                                <div className="text-2xl uppercase">
                                    Đăng nhập
                                </div>
                                <p className="text-xs text-gray-400 flex justify-center">
                                    chào bạn quay trở lại
                                </p>
                            </div>
                            <div className="p-2 h-14">
                                <input className="border w-full h-full mb-2"  style={{ background: 'none', borderRadius: '10px' }}>
                                </input>
                                <input className="border w-full h-full" style={{ background: 'none',borderRadius: '10px' }}>
                                </input>
                            </div>
                        </div>
                        <div className="h-1/5 flex items-center justify-center flex-col">
                            <div className="inline-flex ">
                                <div className=" text-sm pt-1">Bạn không có tài khoản</div>
                                <Link className="text-blue-400 no-underline ml-2" >
                                    Đăng ký
                                </Link>
                            </div>
                            <div className="text-xs flex row gap-2">
                                <p className="text-nowrap ">Terms & Conditions</p>
                                <p className="text-nowrap">Support</p>
                                <p className="text-nowrap">Customer Care</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Login;