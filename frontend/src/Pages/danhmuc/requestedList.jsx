import * as React from 'react';
import { useState } from 'react';
import imgBook from './notbook.png';
// Example image URLs (update this with actual image paths)
const posterImages = [
    'poster1.png', 'poster2.png', 'poster3.png', 'poster4.png', // etc.
];

function createData(poster, bookName, borrowDate, returnStatus, returnTime) {
    return { poster, bookName, borrowDate, returnStatus, returnTime };
}

const rows = [
    createData(imgBook, 'Frozen yoghurt', '01/12/2024', 'Đang mượn', '12/12/2024'),
    createData(imgBook, 'Ice cream sandwich', '02/12/2024', 'Đã trả', '13/12/2024'),
    createData(imgBook, 'Chocolate bar', '03/12/2024', 'Quá hạn', '14/12/2024'),
    ...Array.from({ length: 95 }, (_, index) =>
        createData(
            imgBook, // Loop through the images array
            `Book ${index + 4}`,
            `${String((index % 30) + 1).padStart(2, '0')}/12/2024`,
            index % 3 === 0 ? 'Đang mượn' : index % 3 === 1 ? 'Đã trả' : 'Quá hạn',
            `${String(((index + 12) % 30) + 1).padStart(2, '0')}/12/2024`
        )
    ),
];

export default function BorrowingList() {
    const [currentPage, setCurrentPage] = useState(1); // Current page
    const itemsPerPage = 10; // Rows per page
    const totalPages = Math.ceil(rows.length / itemsPerPage); // Total pages
    const maxPageButtons = 4; // Max buttons to display

    // Rows to display per page
    const displayedRows = rows.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Change page handler
    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // Generate pagination buttons
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

    // Get styles for status
    const getStatusStyles = (status) => {
        const baseStyles =
            'px-3 py-1 text-sm font-medium border rounded-sm text-center inline-block w-32 h-8'; // Fixed width 6rem
        switch (status) {
            case 'Đã trả':
                return `${baseStyles} text-green-600 border-green-600 bg-green-100`;
            case 'Quá hạn':
                return `${baseStyles} text-red-600 border-red-600 bg-red-100`;
            case 'Đang mượn':
                return `${baseStyles} text-white border-gray-700 bg-gray-300`;
            default:
                return baseStyles;
        }
    };

    return (
        <div className="pt-12 px-5 min-h-screen">
            <div className="p-5 text-lg">
                <strong>Danh sách đang mượn</strong>
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
                            className={`px-3 py-1 rounded ${currentPage === page
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200'
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
