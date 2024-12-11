import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import book from '../../Service/book';
import notimg from '../../img/notimg.jpg';

const BookDetail = () => {
    const { id } = useParams(); // Lấy id từ URL
    const [dataBook, setDataBook] = useState(null); // Bắt đầu với null để kiểm tra xem dữ liệu có được tải chưa
    const [dataBookCategory, setDataBookCategory] = useState([]);

    const getBookData = async () => {
        try {
            const rs = await book.getBookById(id);
            if (!rs.success) {
                setDataBook(null); // Nếu không thành công, trả về null
            } else {
                setDataBook(rs.data); // Gán dữ liệu sách vào state
            }
        } catch (error) {
            console.error("Error fetching book:", error);
            setDataBook(null); // Nếu có lỗi khi gọi API, set dataBook là null
        }
    };

    const getBookCategoryData = async () => {
        if (dataBook?.category?._id) { // Kiểm tra nếu dataBook và dataBook.category._id tồn tại
            try {
                const rs = await book.getAllBookByCategory(dataBook.category._id);
                if (rs.success) {
                    setDataBookCategory(rs.data);
                }
            } catch (error) {
                console.error("Error fetching books by category:", error);
            }
        }
    };
    const requestBorrow = async (idBook) => {
        try {
            const rs = await book.requestBorrow(idBook);
            if (rs.success) {
                alert('mượn sách thành công')
            } else {
                alert(rs.mess)
            }
        } catch (error) {
            return console.log("Error request Borrow book:", error);
        }
    };
    useEffect(() => {
        getBookData(); // Gọi API khi component được mount
    }, [id]); // Thêm id vào dependency array để khi id thay đổi sẽ fetch lại dữ liệu mới

    useEffect(() => {
        getBookCategoryData(); // Gọi API khi category _id thay đổi
    }, [dataBook]); // Thêm dataBook?.category?._id vào dependency array

    if (dataBook === null) {
        return (
            <div className="pt-12 px-5 min-h-screen">
                <p>Không tìm thấy sách hoặc có lỗi xảy ra. Vui lòng thử lại sau.</p>
            </div>
        );
    }

    return (
        <div className="pt-12 px-5 min-h-screen flex justify-center">
            {dataBook ? (
                <div className='w-full flex flex-col items-center'>
                    <div className='flex justify-center'>
                        <strong className='py-5 text-3xl uppercase'>{dataBook.title}</strong>
                    </div>
                    <div className='flex flex-row w-[80%]'>
                        <div className='flex flex-col min-h-[100%] min-w-[20%]'>
                            <img
                                src={dataBook.img ? dataBook.img : notimg}
                                className="h-56 border"
                                alt="Book cover"
                                style={{ minWidth: '100%', height: 'auto' }}
                            />
                            <div className='text-center pt-2'>
                                <strong>Sách cùng thể loại</strong>
                            </div>
                        </div>
                        <div className="ml-5 min-w-[80%] bg-gray-300 p-6">
                            <div><strong>Tác giả:</strong> {dataBook.author}</div>
                            <div><strong>Thể loại:</strong> {dataBook.category?.nameCate}</div>
                            <div><strong>Kệ sách:</strong> {dataBook.bookShelf}</div>
                            <div><strong>Số trang:</strong> {dataBook.pageCount}</div>
                            <div><strong>Ngày xuất bản:</strong> {dataBook.publicationDate}</div>
                            <div><strong>Nhà xuất bản:</strong> {dataBook.publisher}</div>
                            <div><strong>Ngôn ngữ:</strong> {dataBook.language}</div>
                            <button
                                onClick={() => requestBorrow(dataBook._id)}
                                className='bg-blue-500 hover:bg-blue-700 text-white p-4 rounded-lg mt-3'>
                                Đăng ký mượn sách
                            </button>
                        </div>
                    </div>

                    {/* Hiển thị sách cùng thể loại */}
                    <div className="w-[80%] mt-5 bg-gray-300 p-5 mb-4">
                        <div className="flex flex-wrap gap-5 overflow-x-auto">
                            {dataBookCategory.length > 0 ? (
                                dataBookCategory.map((bookItem, index) => (
                                    (dataBook._id == bookItem._id) ? '' : (
                                        <a
                                            href={'/book/detail/' + bookItem._id}
                                            key={index}
                                            className="card w-52 bg-gray-200 m-1"
                                        >
                                            <img
                                                src={bookItem.img ? bookItem.img : notimg}
                                                className="h-56 border"
                                                alt="Book cover"
                                                style={{ width: '100%' }}
                                            />
                                            <div className="container p-3">
                                                <h4 className="truncate-title text-ellipsis overflow-hidden whitespace-nowrap">
                                                    <b>{bookItem.title}</b>
                                                </h4>
                                                <p className="flex row">
                                                    Tác giả: <p className="uppercase">{bookItem.author}</p>
                                                </p>
                                            </div>
                                        </a>
                                    )
                                ))
                            ) : (
                                <p>Không có sách cùng thể loại.</p>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <p>Đang tải dữ liệu...</p>
            )}
        </div>
    );
};

export default BookDetail;
