import * as React from 'react';
import { useState, useEffect } from 'react';
import imgBook from './notbook.png'; // Import the default image
import authToken from '../../components/authToken'; // Ensure this exists
import axios from './axios'; // Ensure axios setup is correct

// Helper function to create row data
function createData(poster, bookName, requestDate, receiveDate, returnTime) {
    return { poster, bookName, requestDate, receiveDate, returnTime };
}

export default function HistoryRequestList() {
    const [currentPage, setCurrentPage] = useState(1); // Current page
    const itemsPerPage = 10; // Rows per page
    const maxPageButtons = 4; // Max buttons to display
    const [requests, setRequests] = useState([]); // Data from API
    const [loading, setLoading] = useState(true); // Loading state

    // Fetch data from API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.getList(); // Adjust API call as needed
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
        fetchData();
    }, []);

    // Merge fetched data into rows with default values
    const mergedRows = requests.map((request, index) =>
        createData(
            request.poster || imgBook, // Use API poster or default image
            request.title?.title || `Book ${index + 1}`, // Use API title or fallback
            request.borrowDate
                ? new Date(request.borrowDate).toLocaleDateString('en-GB')
                : 'N/A', // Format date or fallback
            request.receiveDate
                ? new Date(request.receiveDate).toLocaleDateString('en-GB')
                : 'N/A', // Format date or fallback
            request.returnDate
                ? new Date(request.returnDate).toLocaleDateString('en-GB')
                : 'N/A' // Format date or fallback
        )
    );

    // Rows to display per page
    const displayedRows = mergedRows.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Pagination calculations
    const totalPages = Math.ceil(mergedRows.length / itemsPerPage);
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

    if (loading) {
        return <div className="text-center py-10">Loading...</div>;
    }

    return (
        <div className="pt-12 px-5 min-h-screen">
            <div className="p-5 text-lg">
                <strong>Danh sách yêu cầu mượn</strong>
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
                            <td className="py-2">
                                {(currentPage - 1) * itemsPerPage + index + 1}
                            </td>
                            <td>
                                <img
                                    src={row.poster}
                                    alt="Book poster"
                                    className="w-12 h-12 object-cover"
                                />
                            </td>
                            <td>{row.bookName}</td>
                            <td>{row.requestDate}</td>
                            <td>{row.receiveDate}</td>
                            <td>{row.returnTime}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="mt-4 flex justify-center gap-2">
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
                                currentPage === page
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
