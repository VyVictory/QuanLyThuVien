const LeftBar = ({ select }) => {
    return (
        <div className="w-80 h-full bg-[#E8C5E5] p-5 pt-8 text-white">
            <div>
                <button className="bg-[#F19ED2] w-full p-2 rounded-2xl h-11">Danh mục</button>
            </div>
            <div className="ml-3 border-l-2 border-white h-[90%]">
                <div className="flex row items-center pt-4">
                    <div className="w-4  border-b-2 border-white ">
                    </div>
                    <a className="bg-[#F19ED2] w-full p-2 rounded-2xl h-11" href="/">
                        <button
                            className="w-full">Tất cả sách</button>
                    </a>
                </div>
                <div className="flex-col">
                    <div className="flex row items-center pt-4">
                        <div className="w-4  border-b-2 border-white ">
                        </div>
                        <button
                            onClick={() => select('theloai')}
                            className="bg-[#F19ED2] w-full p-2 rounded-2xl h-11" >Thể loại</button>
                    </div>
                    <div className="h-full ml-8 flex row">
                        <div className=" border-l-2 border-white mb-5" style={{ height: 'full' }}></div>
                        <div className="w-full">
                            <div className="flex row items-center pt-4">
                                <div className="w-4  border-b-2 border-white ">
                                </div>
                                <button className="bg-[#F19ED2] w-full p-2 rounded-2xl min-h-11">Tâm lý học</button>
                            </div>
                            <div className="flex row items-center pt-4">
                                <div className="w-4  border-b-2 border-white ">
                                </div>
                                <button className="bg-[#F19ED2] w-full p-2 rounded-2xl min-h-11">Khoa học</button>
                            </div>
                            <div className="flex row items-center pt-4">
                                <div className="w-4  border-b-2 border-white ">
                                </div>
                                <button className="bg-[#F19ED2] w-full p-2 rounded-2xl min-h-11">văn học</button>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="flex row items-center pt-4">
                    <div className="w-4  border-b-2 border-white ">
                    </div>
                    <a className="bg-[#F19ED2] w-full p-2 rounded-2xl h-11" href="/requestlist">
                        <button
                            className="w-full">Danh sách yêu cầu mượn</button>
                    </a>

                </div>
                <div className="flex row items-center pt-4">
                    <div className="w-4  border-b-2 border-white ">
                    </div>
                    <a className="bg-[#F19ED2] w-full p-2 rounded-2xl h-11" href="/requestedlist">
                        <button
                            className="w-full">Danh sách đang mượn</button>
                    </a>
                </div>
                <div className="flex row items-center pt-4">
                    <div className="w-4  border-b-2 border-white ">

                    </div>
                    <a className="bg-[#F19ED2] w-full p-2 rounded-2xl h-11" href="/historyrequestlist">
                        <button
                            className="w-full">Lịch sử mượn sách</button>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default LeftBar;