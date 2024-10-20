import { Link } from "react-router-dom";

const Login = () => {

    return (
        <div className="absolute bg-black bg-opacity-20 top-0 left-0 w-screen h-full justify-center flex">
            <div className=" w-[400px] h-full py-8 text-white">
                <div className="bg-black bg-opacity-70 h-full w-full rounded-2xl p-6">
                    <div className="h-4/5 bg-blue-950 flex items-center flex-col">
                        <div>
                            <div className="text-2xl uppercase">
                                Đăng nhập
                            </div>
                            <p className="text-xs text-gray-400 flex justify-center">
                                chào bạn quay trở lại
                            </p>
                        </div>
                    </div>
                    <div className="h-1/5 flex items-center justify-center flex-col">
                        <div className="inline-flex ">
                            <div>Bạn không có tài khoản</div>
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
    );
}

export default Login;