import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation to get current path
import category from "../../Service/category";
import authToken from "../../components/authToken";
// import { useOutletContext } from "react-router-dom";

const LeftBar = ({ select, dataName }) => {
    // const { dataName } = useOutletContext();
    const [dataCategory, setDataCategory] = useState([]);
    const location = useLocation(); // Get the current location/path

    const getBookData = async () => {
        try {
            const rs = await category.getAllCategory();
            setDataCategory(rs.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    useEffect(() => {
        getBookData();
    }, []);

    // Check if the current URL is "/book/detail/..." using location.pathname
    const isBookDetailPage = location.pathname.startsWith("/book/detail");
    const thisPage = location.pathname.split('/').pop();
    return (
        <>
            <div className="w-80"></div>
            <div className="w-80 h-full bg-[#E8C5E5] p-5 pt-8 text-white fixed overflow-y-auto">
                <div>
                    <button className="bg-[#F19ED2] w-full p-2 rounded-2xl h-11">Danh mục</button>
                </div>
                <div className="ml-3 border-l-2 border-white min-h-screen pb-20">
                    <div className="flex row items-center pt-4">
                        <div className="w-4 border-b-2 border-white "></div>
                        <a className="bg-[#F19ED2] w-full p-2 rounded-2xl h-11" href="/">
                            <button className="w-full">Tất cả sách</button>
                        </a>
                    </div>

                    {/* Conditionally render the category section based on the URL */}
                    {!isBookDetailPage && (
                        <div className="flex-col">
                            <div className="flex row items-center pt-4">
                                <div className="w-4 border-b-2 border-white "></div>
                                <button
                                    onClick={() => select('theloai')}
                                    className="bg-[#F19ED2] w-full p-2 rounded-2xl h-11"
                                >
                                    Thể loại
                                </button>
                            </div>
                            <div className="h-full ml-8 flex row">
                                <div className="border-l-2 border-white mb-5" style={{ height: 'full' }}></div>
                                <div className="w-full">
                                    {dataCategory.map((category, index) => (
                                        <div key={index} className="flex row items-center pt-4">
                                            <div className="w-4 border-b-2 border-white "></div>
                                            <button
                                                onClick={() => select(category._id)}
                                                className={`${dataName !== category._id ? 'bg-[#F19ED2]' : 'bg-blue-500'} w-full p-2 rounded-2xl min-h-11 truncate-title text-ellipsis overflow-hidden whitespace-nowrap`}
                                            >
                                                {category.nameCate}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Other sections that will always be visible */}
                    {
                        authToken.getToken() && (
                            <>
                                <div className="flex row items-center pt-4">
                                    <div className="w-4 border-b-2 border-white "></div>
                                    <a className={`${thisPage === 'requestlist' ? 'bg-blue-500' : 'bg-[#F19ED2]'} w-full p-2 rounded-2xl h-11`} href="/requestlist">
                                        <button className="w-full">Danh sách yêu cầu mượn</button>
                                    </a>
                                </div>
                                <div className="flex row items-center pt-4">
                                    <div className="w-4 border-b-2 border-white "></div>
                                    <a className={`${thisPage === 'requestedlist' ? 'bg-blue-500' : 'bg-[#F19ED2]'} w-full p-2 rounded-2xl h-11`} href="/requestedlist">
                                        <button className="w-full">Danh sách đang mượn</button>
                                    </a>
                                </div>
                                <div className="flex row items-center pt-4">
                                    <div className="w-4 border-b-2 border-white "></div>
                                    <a className={`${thisPage === 'historyrequestlist' ? 'bg-blue-500' : 'bg-[#F19ED2]'} w-full p-2 rounded-2xl h-11`} href="/historyrequestlist">
                                        <button className="w-full">Lịch sử mượn sách</button>
                                    </a>
                                </div>
                            </>
                        )
                    }

                </div>
            </div>
        </>
    );
};

export default LeftBar;
