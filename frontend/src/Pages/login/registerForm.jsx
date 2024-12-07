import { Link } from "react-router-dom";
const RegisterForm = ({ chaneForm }) => {

    
    return (
        <div className="bg-black bg-opacity-70 h-full w-full rounded-2xl p-6 pt-24">
            <div className="h-4/5 flex items-center flex-col px-2">
                <div className="w-full pb-4">
                    <div className="text-2xl uppercase">
                        Đăng Ký
                    </div>
                    <p className="text-xs text-gray-400 ">
                        đăng ký một tài khoản mới của bạn!
                    </p>
                </div>
                <div className="h-12">
                    <input type="text" className="border w-full h-full mb-2 p-2" placeholder="TÊN ĐĂNG NHẬP" style={{ background: 'none', borderRadius: '10px' }}>
                    </input>
                    <input type="text" className="border w-full h-full mb-2 p-2" placeholder="EMAIL/SỐ ĐIỆN THOẠI" style={{ background: 'none', borderRadius: '10px' }}>
                    </input>
                    <input type="password" className="border w-full h-full p-2" placeholder="MẬT KHẨU" style={{ background: 'none', borderRadius: '10px' }}>
                    </input>
                    <input type="password" className="border w-full h-full p-2 mt-2" placeholder="NHẬP LẠI MẬT KHẨU" style={{ background: 'none', borderRadius: '10px' }}>
                    </input>
                    {/* <div className="pl-1 flex items-center mt-2">
                        <input
                            type="checkbox"
                            className="w-4 h-4 bg-gradient-to-b from-blue-500 to-purple-500 rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500"
                        />
                        <label className="ml-2">Nhớ tài khoản</label>
                    </div> */}
                    <div className="w-full pt-3 pb-2">
                        <button className="px-4 py-2 text-white w-full font-semibold rounded-lg bg-gradient-to-r from-[#2E4CEE] to-[#040F75] hover:from-[#3c4eb6] hover:to-[#010956] focus:ring-2 focus:ring-blue-500">
                            ĐĂNG KÝ
                        </button>
                    </div>
                    <div className="w-full flex items-center  justify-center">
                        <button
                            onClick={() => chaneForm('forgotPassword')}
                        >
                            <div className="text-center uppercase">
                                quên mật khẩu?
                            </div>
                        </button>
                    </div>


                </div>
            </div>
            <div className="h-1/5 flex items-center justify-center flex-col">
                <div className="inline-flex items-center">
                    <div className="text-sm">Bạn đã có tài khoản?</div>
                    <button
                        onClick={() => chaneForm('login')}
                        className="text-white  ml-2">
                        Đăng nhập
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

export default RegisterForm;






// import { useState } from "react";
// import axios from "axios";
// import auth from "../../Service/auth";

// const RegisterForm = ({ changeForm }) => {
//     const [form, setForm] = useState({
//         numberPhone: "",
//         firstName: "",
//         lastName: "",
//         address: "",
//         gender: "true", // Default gender is "true" (or you can set based on user input)
//         birthday: "",
//         password: "",
//         confirmPassword: ""
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setForm({ ...form, [name]: value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
        
//         // Kiểm tra nếu mật khẩu và xác nhận mật khẩu khớp
//         if (form.password !== form.confirmPassword) {
//             alert("Mật khẩu và xác nhận mật khẩu không khớp!");
//             return;
//         }

//         // Gọi service đăng ký
//         const response = await auth.register(form);
        
//         if (response.success) {
//             alert("Đăng ký thành công!");
//             // Có thể thêm các hành động sau khi đăng ký thành công, như điều hướng hoặc reset form
//         } else {
//             alert(response.message);
//         }
//     };

//     return (
//         <div className="bg-black bg-opacity-70 h-full w-full rounded-2xl p-6 pt-24">
//             <div className="h-4/5 flex items-center flex-col px-2">
//                 <div className="w-full pb-4">
//                     <div className="text-2xl uppercase">Đăng Ký</div>
//                     <p className="text-xs text-gray-400">
//                         đăng ký một tài khoản mới của bạn!
//                     </p>
//                 </div>
//                 <form onSubmit={handleSubmit}>
//                     <div className="h-12">
//                         <input
//                             type="text"
//                             className="border w-full h-full mb-2 p-2"
//                             placeholder="TÊN ĐĂNG NHẬP"
//                             name="firstName"
//                             value={form.firstName}
//                             onChange={handleChange}
//                             style={{ background: "none", borderRadius: "10px" }}
//                         />
//                         <input
//                             type="text"
//                             className="border w-full h-full mb-2 p-2"
//                             placeholder="EMAIL/SỐ ĐIỆN THOẠI"
//                             name="numberPhone"
//                             value={form.numberPhone}
//                             onChange={handleChange}
//                             style={{ background: "none", borderRadius: "10px" }}
//                         />
//                         <input
//                             type="password"
//                             className="border w-full h-full p-2"
//                             placeholder="MẬT KHẨU"
//                             name="password"
//                             value={form.password}
//                             onChange={handleChange}
//                             style={{ background: "none", borderRadius: "10px" }}
//                         />
//                         <input
//                             type="password"
//                             className="border w-full h-full p-2 mt-2"
//                             placeholder="NHẬP LẠI MẬT KHẨU"
//                             name="confirmPassword"
//                             value={form.confirmPassword}
//                             onChange={handleChange}
//                             style={{ background: "none", borderRadius: "10px" }}
//                         />
//                         <input
//                             type="text"
//                             className="border w-full h-full mb-2 p-2"
//                             placeholder="ĐỊA CHỈ"
//                             name="address"
//                             value={form.address}
//                             onChange={handleChange}
//                             style={{ background: "none", borderRadius: "10px" }}
//                         />
//                         <div className="w-full pt-3 pb-2">
//                             <button
//                                 type="submit"
//                                 className="px-4 py-2 text-white w-full font-semibold rounded-lg bg-gradient-to-r from-[#2E4CEE] to-[#040F75] hover:from-[#3c4eb6] hover:to-[#010956] focus:ring-2 focus:ring-blue-500"
//                             >
//                                 ĐĂNG KÝ
//                             </button>
//                         </div>
//                     </div>
//                 </form>
//                 <div className="w-full flex items-center justify-center">
//                     <button onClick={() => changeForm("forgotPassword")}>
//                         <div className="text-center uppercase">quên mật khẩu?</div>
//                     </button>
//                 </div>
//             </div>
//             <div className="h-1/5 flex items-center justify-center flex-col">
//                 <div className="inline-flex items-center">
//                     <div className="text-sm">Bạn đã có tài khoản?</div>
//                     <button onClick={() => changeForm("login")} className="text-white ml-2">
//                         Đăng nhập
//                     </button>
//                 </div>
//                 <div className="text-xs flex row gap-2 w-full justify-center">
//                     <p className="text-nowrap p-2">Terms & Conditions</p>
//                     <p className="text-nowrap p-2">Support</p>
//                     <p className="text-nowrap p-2">Customer Care</p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default RegisterForm;
