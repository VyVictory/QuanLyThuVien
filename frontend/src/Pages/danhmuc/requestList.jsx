import * as React from 'react';
import { useState, useEffect } from 'react';
import imgBook from './notbook.png';
import axios from './axios';

function createData(poster, bookName, borrowDate, returnStatus, returnTime) {
    return { poster, bookName, borrowDate, returnStatus, returnTime };
}

export default function BorrowingList() {
    const [currentPage, setCurrentPage] = useState(1);
    const [rows, setRows] = useState([]); // Updated rows to be dynamic
    const itemsPerPage = 10;
    const totalPages = Math.ceil(rows.length / itemsPerPage);
    const maxPageButtons = 4;

    const displayedRows = rows.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const generatePageNumbers = () => {
        const pageNumbers = [];
        const startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
        const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

        if (startPage > 1) pageNumbers.push(1, '...');
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }
        if (endPage < totalPages) pageNumbers.push('...', totalPages);

        return pageNumbers;
    };

    const getStatusStyles = (status) => {
        const baseStyles =
            'px-3 py-1 text-sm font-medium border rounded-sm text-center inline-block w-40 h-8';
        switch (status) {
            case 'Đã trả':
                return `${baseStyles} text-green-600 border-green-600 bg-green-100`;
            case 'Quá hạn':
                return `${baseStyles} text-red-600 border-red-600 bg-red-100`;
            case 'Đang mượn':
                return `${baseStyles} text-white border-gray-700 bg-gray-300`;
            case 'Đang gửi yêu cầu': // New status
                return `${baseStyles} text-blue-600 border-blue-600 bg-blue-100`;
            case 'Bị từ chối': // New status
                return `${baseStyles} text-gray-600 border-gray-600 bg-gray-100`;
            default:
                return baseStyles;
        }
    };

    // Fetch data from API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.getMyRequests(); // Adjust API call as needed
                if (res.success) {
                    const fetchedRows = res.data.map((request, index) => {
                        const statusMap = {
                            pending: 'Đang gửi yêu cầu',
                            approved: 'Đang mượn',
                            rejected: 'Bị từ chối',
                        };
                        return createData(
                            imgBook, // Default image
                            request.book.title, // Book title
                            new Date(request.requestedDate).toLocaleDateString('vi-VN'), // Format borrow date
                            statusMap[request.status] || 'Đã trả', // Map status, default to 'Đã trả'
                            request.responseDate
                                ? new Date(request.responseDate).toLocaleDateString('vi-VN')
                                : 'Chưa có' // Format response date
                        );
                    });
        
                    // Filter out the rows where returnStatus is 'Đã trả'
                    const filteredRows = fetchedRows.filter(row => row.returnStatus !== 'Đã trả');
                    
                    setRows(filteredRows); // Set the filtered data into rows
                } else {
                    setRows([]); // Handle failure case
                }
            } catch (error) {
                console.error('Error fetching requests:', error);
                setRows([]); // Handle error case
            }
        };
        fetchData();
    }, []);
    
    return (
        <div className="pt-12 px-5 min-h-screen">
            <div className="p-5 text-lg">
                <strong>Danh sách yêu cầu  mượn</strong>
            </div>
            <table className="w-full min-h-full">
                <thead>
                    <tr className="text-gray-400 border-b">
                        <th className="py-2">STT</th>
                        <th>Poster</th>
                        <th>Tên sách</th>
                        <th>Ngày đã nhận sách</th>
                        <th>Trạng thái trả</th>
                        <th>Thời gian trả sách</th>
                    </tr>
                </thead>
                <tbody>
                    {displayedRows.map((row, index) => (
                        <tr key={index} className="text-center border-b">
                            <td className="py-2">
                                {(currentPage - 1) * itemsPerPage + index + 1}
                            </td>
                            <td>
                                <img src={row.poster} alt="Book poster" className="w-12 h-12 object-cover" />
                            </td>
                            <td>{row.bookName}</td>
                            <td>{row.borrowDate}</td>
                            <td>
                                <span className={getStatusStyles(row.returnStatus)}>
                                    {row.returnStatus}
                                </span>
                            </td>
                            <td>{row.returnTime}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="mt-4 flex justify-center gap-2 float-end fixed bottom-6 right-6">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                    {'<'}
                </button>
                {generatePageNumbers().map((page, index) =>
                    typeof page === 'number' ? (
                        <button
                            key={index}
                            onClick={() => handlePageChange(page)}
                            className={`px-3 py-1 rounded ${
                                currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200'
                            }`}
                        >
                            {page}
                        </button>
                    ) : (
                        <span key={index} className="px-3 py-1">
                            {page}
                        </span>
                    )
                )}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                    {'>'}
                </button>
            </div>
        </div>
    );
}
