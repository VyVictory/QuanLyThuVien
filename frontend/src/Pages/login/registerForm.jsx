import { useState } from "react";
import auth from "../../Service/auth";
const RegisterForm = ({ chaneForm }) => {
    const [form, setForm] = useState({
        username: "",
        firstName: "",
        lastName: "",
        address: "",
        gender: "true", // Default gender
        birthday: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.password !== form.confirmPassword) {
            alert("Mật khẩu và xác nhận mật khẩu không khớp!");
            return;
        }
        try {
            const rep = await auth.register(form);
            console.log(rep)
            if (rep.success) {
                alert("Register successfully!");
            }else{
                alert("Register Fail!"+rep.message);
            }
        } catch (error) {
            console.error(error)
        }
    };
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
                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                    {/* Left Column */}
                    <div>
                        <input
                            type="text"
                            className="border w-full h-12 mb-2 p-2 "
                            placeholder="TÊN ĐĂNG NHẬP"
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            style={{ background: "none", borderRadius: "10px" }}
                        />
                        <input
                            type="text"
                            className="border w-full h-12 mb-2 p-2"
                            placeholder="TÊN"
                            name="firstName"
                            value={form.firstName}
                            onChange={handleChange}
                            style={{ background: "none", borderRadius: "10px" }}
                        />
                        <input
                            type="text"
                            className="border w-full h-12 mb-2 p-2"
                            placeholder="HỌ"
                            name="lastName"
                            value={form.lastName}
                            onChange={handleChange}
                            style={{ background: "none", borderRadius: "10px" }}
                        />
                        <input
                            type="text"
                            className="border w-full h-12 mb-2 p-2"
                            placeholder="ĐỊA CHỈ"
                            name="address"
                            value={form.address}
                            onChange={handleChange}
                            style={{ background: "none", borderRadius: "10px" }}
                        />
                    </div>
                    {/* Right Column */}
                    <div>
                        <select
                            className="border w-full h-12 mb-2 p-2 "
                            name="gender"
                            value={form.gender}
                            onChange={handleChange}
                            style={{ background: "none", borderRadius: "10px" }}
                        >
                            <option value="true" className="text-black">Nam</option>
                            <option value="false" className="text-black">Nữ</option>
                        </select>
                        <input
                            type="date"
                            className="border w-full h-12 mb-2 p-2"
                            placeholder="NGÀY SINH"
                            name="birthday"
                            value={form.birthday}
                            onChange={handleChange}
                            style={{ background: "none", borderRadius: "10px" }}
                        />
                        <input
                            type="password"
                            className="border w-full h-12 p-2"
                            placeholder="MẬT KHẨU"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            style={{ background: "none", borderRadius: "10px" }}
                        />
                        <input
                            type="password"
                            className="border w-full h-12 p-2 mt-2"
                            placeholder="NHẬP LẠI MẬT KHẨU"
                            name="confirmPassword"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            style={{ background: "none", borderRadius: "10px" }}
                        />
                    </div>
                    {/* Submit Button */}
                    <div className="col-span-2">
                        <button
                            type="submit"
                            className="px-4 py-2 text-white w-full font-semibold rounded-lg bg-gradient-to-r from-[#2E4CEE] to-[#040F75] hover:from-[#3c4eb6] hover:to-[#010956] focus:ring-2 focus:ring-blue-500"
                        >
                            ĐĂNG KÝ
                        </button>
                    </div>
                </form>
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

// const RegisterForm = ({ changeForm }) => {
//     const [form, setForm] = useState({
//         numberPhone: "",
//         firstName: "",
//         lastName: "",
//         address: "",
//         gender: "true", // Default gender
//         birthday: "",
//         password: "",
//         confirmPassword: ""
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setForm({ ...form, [name]: value });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (form.password !== form.confirmPassword) {
//             alert("Mật khẩu và xác nhận mật khẩu không khớp!");
//             return;
//         }
//         alert("Form submitted successfully!");
//     };

//     return (
//         <div className="bg-black bg-opacity-70 h-full w-full rounded-2xl p-6 pt-24">
//             <div className="w-full pb-4 text-center">
//                 <div className="text-2xl uppercase text-white">Đăng Ký</div>
//                 <p className="text-xs text-gray-400">Đăng ký một tài khoản mới của bạn!</p>
//             </div>
//             <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
//                 {/* Left Column */}
//                 <div>
//                     <input
//                         type="text"
//                         className="border w-full h-12 mb-2 p-2 "
//                         placeholder="SỐ ĐIỆN THOẠI"
//                         name="numberPhone"
//                         value={form.numberPhone}
//                         onChange={handleChange}
//                         style={{ background: "none", borderRadius: "10px" }}
//                     />
//                     <input
//                         type="text"
//                         className="border w-full h-12 mb-2 p-2"
//                         placeholder="TÊN"
//                         name="firstName"
//                         value={form.firstName}
//                         onChange={handleChange}
//                         style={{ background: "none", borderRadius: "10px" }}
//                     />
//                     <input
//                         type="text"
//                         className="border w-full h-12 mb-2 p-2"
//                         placeholder="HỌ"
//                         name="lastName"
//                         value={form.lastName}
//                         onChange={handleChange}
//                         style={{ background: "none", borderRadius: "10px" }}
//                     />
//                     <input
//                         type="text"
//                         className="border w-full h-12 mb-2 p-2"
//                         placeholder="ĐỊA CHỈ"
//                         name="address"
//                         value={form.address}
//                         onChange={handleChange}
//                         style={{ background: "none", borderRadius: "10px" }}
//                     />
//                 </div>
//                 {/* Right Column */}
//                 <div>
//                     <select
//                         className="border w-full h-12 mb-2 p-2"
//                         name="gender"
//                         value={form.gender}
//                         onChange={handleChange}
//                         style={{ background: "none", borderRadius: "10px" }}
//                     >
//                         <option value="true">Nam</option>
//                         <option value="false">Nữ</option>
//                     </select>
//                     <input
//                         type="date"
//                         className="border w-full h-12 mb-2 p-2"
//                         placeholder="NGÀY SINH"
//                         name="birthday"
//                         value={form.birthday}
//                         onChange={handleChange}
//                         style={{ background: "none", borderRadius: "10px" }}
//                     />
//                     <input
//                         type="password"
//                         className="border w-full h-12 p-2"
//                         placeholder="MẬT KHẨU"
//                         name="password"
//                         value={form.password}
//                         onChange={handleChange}
//                         style={{ background: "none", borderRadius: "10px" }}
//                     />
//                     <input
//                         type="password"
//                         className="border w-full h-12 p-2 mt-2"
//                         placeholder="NHẬP LẠI MẬT KHẨU"
//                         name="confirmPassword"
//                         value={form.confirmPassword}
//                         onChange={handleChange}
//                         style={{ background: "none", borderRadius: "10px" }}
//                     />
//                 </div>
//                 {/* Submit Button */}
//                 <div className="col-span-2">
//                     <button
//                         type="submit"
//                         className="px-4 py-2 text-white w-full font-semibold rounded-lg bg-gradient-to-r from-[#2E4CEE] to-[#040F75] hover:from-[#3c4eb6] hover:to-[#010956] focus:ring-2 focus:ring-blue-500"
//                     >
//                         ĐĂNG KÝ
//                     </button>
//                 </div>
//             </form>
//             <div className="text-center mt-4">
//                 <p>Bạn đã có tài khoản?{" "}
//                     <button onClick={() => changeForm("login")} className="text-white">
//                         Đăng nhập
//                     </button>
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default RegisterForm;
