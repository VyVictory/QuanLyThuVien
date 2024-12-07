import { Link } from "react-router-dom";
const ForgotPasswordFrom = ({chaneForm}) => {
    return (
        <div className="bg-black bg-opacity-70 h-full w-full rounded-2xl p-6 pt-24">
            <div className="h-4/5 flex items-center flex-col px-2">
                <div className="w-full pb-4">
                    <div className="text-2xl uppercase">
                        quên mật khẩu?
                    </div>
                    <p className="text-xs text-gray-400 ">
                        nhập email của bạn 
                    </p>
                </div>
                <div className="h-12 w-full">
                    <input type="password" className="border w-full h-full p-2  mb-2" placeholder="@Email" style={{ background: 'none', borderRadius: '10px' }}>
                    </input>
                    {/* <div className="pl-1 flex items-center mt-2">
                        <input
                            type="checkbox"
                            className="w-4 h-4 bg-gradient-to-b from-blue-500 to-purple-500 rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500"
                        />
                        <label className="ml-2">Nhớ tài khoản</label>
                    </div> */}
                    <div className="w-full pt-3 pb-2">
                        <button className="px-4 py-2 text-white w-full font-semibold rounded-lg bg-gradient-to-r from-[#E948C5] to-[#75042D] hover:from-E948C5-700 hover:to-CD407B-700 focus:ring-2 focus:ring-blue-500">
                            Tạo mật khẩu mới
                        </button>
                    </div>
                    {/* <a href="#">
                        <div className="text-center">
                            quên mật khẩu?
                        </div>
                    </a> */}

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
                    <p className="text-nowrap text-base p-2">hỗ trợ</p>
                </div>
            </div>
        </div>
    );
}

export default ForgotPasswordFrom;