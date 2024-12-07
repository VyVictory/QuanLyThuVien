const LeftBar = ({ select }) => {
    return (
        <div className="w-72 bg-[#E8C5E5] h-full p-5 pt-8 text-white">
            <div>
                <button className="bg-[#F19ED2] w-full p-2 rounded-2xl h-11">Danh mục</button>
            </div>
            <div className="ml-3 border-l-2 border-white h-[90%]">
                <div className="flex row items-center pt-4">
                    <div className="w-4  border-b-2 border-white ">
                    </div>
                    <button
                        onClick={() => select('tatca')}
                        className="bg-[#F19ED2] w-full p-2 rounded-2xl h-11">Tất cả sách</button>
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
                    <button 
                    onClick={() => select('sachyeucaumuon')}
                    className="bg-[#F19ED2] w-full p-2 rounded-2xl h-11">Danh sách yêu cầu mượn</button>
                </div>
                <div className="flex row items-center pt-4">
                    <div className="w-4  border-b-2 border-white ">
                    </div>
                    <button
                    onClick={() => select('sachdangmuon')}
                    className="bg-[#F19ED2] w-full p-2 rounded-2xl h-11">Danh sách đang mượn</button>
                </div>
                <div className="flex row items-center pt-4">
                    <div className="w-4  border-b-2 border-white ">
                    </div>
                    <button
                    onClick={() => select('lichsumuonsach')}
                    className="bg-[#F19ED2] w-full p-2 rounded-2xl h-11">Lịch sử mượn sách</button>
                </div>
            </div>
        </div>
    );
}

export default LeftBar;