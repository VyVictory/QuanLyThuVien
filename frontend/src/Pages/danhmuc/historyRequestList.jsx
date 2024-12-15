import * as React from 'react';
import { useState,useEffect } from 'react';
import imgBook from './notbook.png'; // Import the default image
import authToken from '../../components/authToken';
import axios from './axios';

function createData(poster, bookName, requestDate, receiveDate, returnTime) {
    return { poster, bookName, requestDate, receiveDate, returnTime };
}

// Example image list (you can update this with your actual images)
const images = [
    'image1.png', 'image2.png', 'image3.png', 'image4.png', // etc.
];

const rows = [
    createData(imgBook, 'Frozen yoghurt', '01/12/2024', '05/12/2024', '12/12/2024'),
    createData(imgBook, 'Ice cream sandwich', '02/12/2024', '06/12/2024', '13/12/2024'),
    ...Array.from({ length: 95 }, (_, index) =>
        createData(
            imgBook, // Loop through the images array
            `Book ${index + 3}`,
            `${String((index % 30) + 1).padStart(2, '0')}/12/2024`,
            `${String(((index + 5) % 30) + 1).padStart(2, '0')}/12/2024`,
            `${String(((index + 12) % 30) + 1).padStart(2, '0')}/12/2024`
        )
    ),
];
export default function HistoryRequestList() {
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
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const res = await axios.getList();
                if (res.success) {
                    setRequests(res.data);
                } else {
                    setRequests([]);
                }
            } catch (error) {
                console.error('Error fetching requests:', error);
                setRequests([]);
            } finally {
                setLoading(false); // Stop loading
            }
        };
        fetchdata();
    }, []);

    return (
        <div className="pt-12 px-5 min-h-screen">
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
                            <td>
                                <img src={row.poster} alt="Book poster" className="w-12 h-12 object-cover" />
                            </td>
                            <td>{row.bookName}</td>
                            {/* 
                            {row.}
                            
                            */}
                            <td>{row.requestDate}</td>
                            <td>{row.receiveDate}</td>
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
                            className={`px-3 py-1 rounded ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
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
