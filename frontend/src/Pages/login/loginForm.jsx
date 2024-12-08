import { Link } from "react-router-dom";
const LoginForm = ({ chaneForm }) => {
    // const [form, setForm] = useState({
    //     numberPhone: "",
    //     password: "",
    // });

    return (
        <div className="bg-black bg-opacity-70 h-full w-full rounded-2xl p-6 pt-24">
            <div className="h-4/5 flex items-center flex-col px-2">
                <div className="w-full pb-4">
                    <div className="text-2xl uppercase">
                        Đăng nhập
                    </div>
                    <p className="text-xs text-gray-400 ">
                        chào bạn quay trở lại
                    </p>
                </div>
                <div className="h-12">
                    <input type="text" className="border w-full h-full mb-2 p-2" placeholder="Tên đăng nhập" style={{ background: 'none', borderRadius: '10px' }}>
                    </input>
                    <input type="password" className="border w-full h-full p-2" placeholder="Mật khẩu" style={{ background: 'none', borderRadius: '10px' }}>
                    </input>
                    <div className="pl-1 flex items-center mt-2">
                        <input
                            type="checkbox"
                            className="w-4 h-4 bg-gradient-to-b from-blue-500 to-purple-500 rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500"
                        />
                        <label className="ml-2">Nhớ tài khoản</label>
                    </div>
                    <div className="w-full pt-3 pb-2">
                        <button className="px-4 py-2 text-white w-full font-semibold rounded-lg bg-gradient-to-r from-[#628EFF] to-[#8740CD] hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500">
                            Login
                        </button>
                    </div>
                    <button
                        onClick={() => chaneForm('forgotPassword')}
                    >
                        <div className="text-center">
                            quên mật khẩu?
                        </div>
                    </button>

                </div>
            </div>
            <div className="h-1/5 flex items-center justify-center flex-col">
                <div className="inline-flex items-center">
                    <div className="text-sm">Bạn không có tài khoản?</div>
                    <button
                        onClick={() => chaneForm('register')}
                        className="text-white  ml-2">
                        Đăng ký
                    </button>
                </div>

                <div className="text-xs flex row gap-2 w-full justify-center">
                    <p className="text-nowrap p-2">Terms & Conditions</p>
                    <p className="text-nowrap p-2">Support</p>
                    <p className="text-nowrap p-2">Customer Care</p>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;