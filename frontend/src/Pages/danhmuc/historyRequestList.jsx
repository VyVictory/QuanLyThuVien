import * as React from 'react';
import { useState } from 'react';

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    ...Array.from({ length: 95 }, (_, index) =>
        createData(`Item ${index + 3}`, 100 + index, 5 + index * 0.1, 20 + index, 3.0)
    ),
];

export default function HistoryRequestList() {
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const itemsPerPage = 10; // Số hàng mỗi trang
    const totalPages = Math.ceil(rows.length / itemsPerPage); // Tổng số trang
    const maxPageButtons = 4; // Số nút hiển thị tối đa

    // Tính toán dữ liệu hiển thị trên mỗi trang
    const displayedRows = rows.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Chuyển trang
    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // Tạo danh sách nút phân trang
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

    return (
        <div className="pt-12 px-5">
            <div className="p-5 text-lg">
                <strong>Lịch sử mượn sách</strong>
            </div>
            <table className="w-full min-h-full">
                <thead>
                    <tr className="text-gray-400 border-b">
                        <th className="py-2">STT</th>
                        <th>Poster</th>
                        <th>Tên sách</th>
                        <th>Ngày gửi yêu cầu</th>
                        <th>Ngày nhận sách</th>
                        <th>Thời gian trả sách</th>
                    </tr>
                </thead>
                <tbody>
                    {displayedRows.map((row, index) => (
                        <tr key={index} className="text-center border-b">
                            <td className="py-2">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                            <td>{row.name}</td>
                            <td>{row.calories}</td>
                            <td>{row.fat}</td>
                            <td>{row.carbs}</td>
                            <td>{row.protein}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="mt-4 flex justify-center gap-2 float-end h-full">
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
                            className={`px-3 py-1 rounded ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200'
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
